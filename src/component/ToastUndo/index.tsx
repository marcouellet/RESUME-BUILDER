import React from 'react';

import { appStore } from '../../redux/store';
import { addDeletedWorkExperienceItem, addDeletedEducationItem, addDeletedSkillItem } from '../../redux/core/actions';

import styles from './toastUndo.module.scss';

interface TProps {
    itemId: string;
    message: string;
    data: {
        [key: string]: string;
    }[];
    type: string;
}

const ToastUndo = (props: TProps): JSX.Element => {
    const deletedItem = props.data.filter(({ id }) => id === props.itemId);

    function handleClick(): void {
        if (props.type === 'workExperience') {
            appStore.dispatch(addDeletedWorkExperienceItem(deletedItem));
        } else if (props.type === 'education') {
            appStore.dispatch(addDeletedEducationItem(deletedItem));
        } else if (props.type === 'skills') {
            appStore.dispatch(addDeletedSkillItem(deletedItem));
        }
    }

    return (
        <div className={styles.toastBox}>
            <div className={styles.toastMessage}>{props.message}</div>
            <div className={styles.toastUndoBtn} onClick={handleClick}>
                UNDO
            </div>
        </div>
    );
};

/* Export Component =============================== */
export default ToastUndo;
