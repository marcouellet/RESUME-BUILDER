import React from 'react';
import { useSelector } from 'react-redux';
import styles from './style.module.scss';
import { TopNavbar, Footer } from '@component';
import { One } from '@template';
import Head from 'next/head';

interface TProps {
    theme: {
        color: string;
        fontFamily: string;
    };
    itemStatus: {
        [key: string]: boolean;
    };
    userData: {
        [key: string]: string;
    };
}

const Home: React.FC<TProps> = () => {
    const state = useSelector((state: TProps) => state);

    return (
        <>
            <Head>
                <title>resume builder | Mou inc resume</title>
            </Head>
            <div style={{ fontFamily: state.theme.fontFamily }}>
                <div className={styles.loading} style={{ background: state.theme.color }}>
                    <div className={styles.loading_gradient}></div>
                </div>

                <TopNavbar itemStatus={state.itemStatus} theme={state.theme} userData={state.userData} />

                <div className={styles.container}>
                    <One />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Home;
