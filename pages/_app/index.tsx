import React from 'react';
import { Store } from 'redux';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { appStore, AppStore } from '../../src/redux/store';
import { ToastContainer } from 'react-toastify';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import Head from 'next/head';

import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

import 'react-tippy/dist/tippy.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'react-toastify/dist/ReactToastify.css';
import '../../src/theme/main.scss';

import { Colors } from '@colors';

const isServer = typeof window === 'undefined';

declare global {
    interface Window {
        __NEXT_REDUX_STORE__: Store<AppStore>;
    }
}

const theme = {
    colors: {
        ...Colors,
    },
};

function getOrCreateStore(): Store<AppStore> {
    // Always make a new store if server, otherwise state is shared between requests
    if (isServer) {
        return appStore;
    }

    // Create store if unavailable on the client and set it on the window object
    if (!window.__NEXT_REDUX_STORE__) {
        window.__NEXT_REDUX_STORE__ = appStore;
    }
    return window.__NEXT_REDUX_STORE__;
}

const reduxStore = getOrCreateStore();

const App = (props: any): JSX.Element => {
    const { Component, pageProps } = props;
    const persistor = persistStore(reduxStore);
    const initialReduxState = persistor.getState();

    return (
        <>
            <Head>
                <title>Mou inc resume | free resume builder</title>
                <meta name="description" content="A modern real time design and 100% free resume builder."></meta>
            </Head>
            <Provider store={appStore}>
                <PersistGate
                    loading={<Component {...pageProps} reduxStore={reduxStore} initialReduxState={initialReduxState} />}
                    persistor={persistor}
                >
                    <ThemeProvider theme={theme}>
                        <Component {...pageProps} reduxStore={reduxStore} initialReduxState={initialReduxState} />
                    </ThemeProvider>
                </PersistGate>
            </Provider>
            <ToastContainer />
        </>
    );
};

export default App;
