import React from 'react';
import Link from 'next/link';

import { HeaderNavbar, Footer } from '@component';

import styles from './style.module.scss';

const Home = () => {
    return (
        <div className={styles.homePage}>
            <HeaderNavbar />

            <div className="container">
                <section className={['row', styles.first].join(' ')}>
                    <div className={['col-md-6', styles.firstLeft].join(' ')}>
                        <h1>Start designing your resume</h1>
                        <div className={styles.crBtn}>
                            <Link href="/resume-builder">
                                <a>Build My Resume</a>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </div>
    );
};

export default Home;
