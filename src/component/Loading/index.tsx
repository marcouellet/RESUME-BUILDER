import React from 'react';

import styles from './style.module.scss';

interface TProps {
    show: boolean;
}

const Loading = (props: TProps): JSX.Element => {
    return props.show ? (
        <div className={styles.container}>
            <div className={['verticalCenter', styles.gif].join(' ')}>
                <img src="/images/pdf-generate.gif" alt="pdf generate animation" />
            </div>
        </div>
    ) : (
        <div />
    );
};

export default Loading;
