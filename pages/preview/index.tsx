import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import download from 'downloadjs';
import Head from 'next/head';
import styles from './style.module.scss';
import { One } from '@template';

import { Util } from '@lib';
import { APIConfig } from '@constant';
import Router from 'next/router';

import { importUserData, exportUserData } from '../../src/redux/core/actions';
import { Loading } from '@component';

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

const Home = (props: TProps) => {
    const [exportStatus, setExportStatus] = useState<any>(false);
    const [gifGenerateStatus, setGifGenerateStatus] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const exportStatus = Util.getQueryString(window.location, 'export');
        setExportStatus(exportStatus);

        const data = Util.getQueryString(window.location, 'data');
        if (exportStatus === 'true' && data) {
            fetch(`${APIConfig.hostname}/download?data=${data}`)
                .then((response) => response.json())
                .then((res) => {
                    importUserData(JSON.parse(JSON.stringify(res)));
                });
        }
    }, []);

    const _downloadPDFBtnPress = async () => {
        const data = dispatch(exportUserData());
        const fileName = `CV-${props.userData.name}.pdf`;

        setGifGenerateStatus(true);

        const req = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };

        const res = await fetch(`${APIConfig.hostname}/download`, req);
        const blob = await res.blob();
        setExportStatus(false);
        download(blob, fileName);
    };

    return (
        <>
            <Head>
                <title>preview | wtfresume</title>
            </Head>
            <div style={{ fontFamily: props.theme.fontFamily }}>
                {exportStatus !== 'true' && (
                    <>
                        <div className={styles.bgLayer} />

                        <div className={styles.topNav}>
                            <div className={styles.left}>
                                <i className="material-icons" onClick={() => Router.back()}>
                                    keyboard_backspace
                                </i>
                            </div>

                            <div className={['verticalCenter', styles.right].join(' ')}>
                                <span onClick={_downloadPDFBtnPress}>Download as PDF</span>
                            </div>
                        </div>
                    </>
                )}

                <div className={[styles.container, exportStatus !== 'true' && styles.previewContainer].join(' ')}>
                    <One />
                </div>

                <Loading show={gifGenerateStatus} />
            </div>
        </>
    );
};

export default Home;
