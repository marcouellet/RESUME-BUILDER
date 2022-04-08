import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

import { HeaderNavbar, Footer } from '@component';

import styles from './style.module.scss';

const Custom404 = (): JSX.Element => {
    return (
        <div className={styles.errPage}>
            <Head>
                <title>404 Not Found | wtfresume</title>
            </Head>
            <HeaderNavbar />

            <div className="container">
                <div className={styles.insideErr}>
                    <h1>404 | Page Not Found</h1>
                    <Link href="/">
                        <a>Home Page</a>
                    </Link>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Custom404;
