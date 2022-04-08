import React from 'react';
import { useSelector } from 'react-redux';
import styles from './style.module.scss';
import { TopNavbar, Footer } from '@component';
import { One } from '@template';
import Head from 'next/head';
import { AppStore } from '../../src/redux/store';

const Home = (): JSX.Element => {
    const state = useSelector<AppStore>((state) => state) as AppStore;

    return (
        <>
            <Head>
                <title>resume builder | wtfresume</title>
            </Head>
            <div style={{ fontFamily: state.theme.fontFamily }}>
                <div className={styles.loading} style={{ background: state.theme.color }}>
                    <div className={styles.loading_gradient}></div>
                </div>

                <TopNavbar itemStatus={state.itemStatus} theme={state.theme} userData={state.userData} />

                <div className={styles.container}>
                    <One {...state} userData={state.userData as any} />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Home;
