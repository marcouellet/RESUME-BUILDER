import React from 'react';
import { useDispatch } from 'react-redux';
import { Toast, Util } from '@lib';
import { Text, Dnd } from '@component';
import { addNewWorkExperience, updateWorkExperience, deleteWorkExperienceData } from '../../../../redux/core/actions';
import styles from './experience.module.scss';
import { KeyValueObject, KeyValueObjectArray } from '../../../../redux/store';

interface TProps {
    data: KeyValueObjectArray;
    color: string;
}

const WorkExperience = (props: TProps): JSX.Element => {
    const dispatch = useDispatch();

    const _updateWorkExperience = (data: KeyValueObjectArray): void => {
        const storeReorder = Util.mapOrder(props.data, data, 'id');
        dispatch(updateWorkExperience(storeReorder));
    };

    const _addNewItem = (): void => {
        dispatch(addNewWorkExperience());
    };

    const _removeItem = (id: string, data: KeyValueObjectArray): void => {
        Toast.showUndo(id, data, 'workExperience', 'Work Item Removed');
        dispatch(deleteWorkExperienceData(id));
    };

    return (
        <Dnd
            data={props.data}
            reorder={(e) => _updateWorkExperience(e)}
            additem={_addNewItem}
            removeitem={(id: string) => _removeItem(id, props.data)}
            renderItem={(item: KeyValueObject) => (
                <div className={styles.workBox}>
                    <div className={styles.leftWork}>
                        <Text
                            value={item.date}
                            statename="workExperience.date"
                            stateid={item.id}
                            placeholder="May 2018 – May 2019"
                            customclass={styles.workDate}
                            tag="div"
                        />
                    </div>
                    <div className={styles.RightWork}>
                        <div className={styles.workDot} />
                        <Text
                            value={item.jobTitle}
                            statename="workExperience.jobTitle"
                            stateid={item.id}
                            placeholder="React Native Developer"
                            customclass={styles.workTitle}
                            tag="div"
                        />
                        <Text
                            value={item.companyName}
                            statename="workExperience.companyName"
                            stateid={item.id}
                            placeholder="Facebook"
                            customclass={styles.workCompany}
                            tag="div"
                        />
                        <Text
                            value={item.companyText}
                            statename="workExperience.companyText"
                            stateid={item.id}
                            customclass={styles.companyExplain}
                            placeholder="Facebook, Inc. is an American social media and technology company based in Menlo Park, California."
                        />
                        <div className={styles.experienceText}>
                            <Text
                                value={item.experienceText}
                                statename="workExperience.experienceText"
                                stateid={item.id}
                                customclass={styles.companyExplain}
                                placeholder="- your experience..."
                            />
                        </div>
                    </div>
                </div>
            )}
        />
    );
};

/* Export Component =============================== */
export default WorkExperience;
