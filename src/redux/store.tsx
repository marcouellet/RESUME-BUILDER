import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export interface AppStore {
    userData: {
        [key: string]: string;
    };
    workExperience: [
        {
            [key: string]: string;
        }
    ];

    education: [
        {
            [key: string]: string;
        }
    ];
    skills: [
        {
            [key: string]: string;
        }
    ];
    theme: {
        color: string;
        fontFamily: string;
    };
    itemStatus: {
        [key: string]: boolean;
    };
}

const persistConfig = {
    key: 'primary',
    storage,
    whitelist: ['userData', 'workExperience', 'education', 'skills', 'theme', 'itemStatus'], // place to select which state you want to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const appStore = createStore(
    persistedReducer,
    /* preloadedState, */
    composeWithDevTools(applyMiddleware(thunk))
);
