import React from 'react';
import { useDispatch } from 'react-redux';
import { Toast, Util } from '@lib';
import { Text, Dnd } from '@component';
import { KeyValueObject, KeyValueObjectArray } from '../../one';

import { addEducation, updateEducation, deleteEducationData } from '../../../../redux/core/actions';

import styles from './education.module.scss';

interface TProps {
    data: KeyValueObjectArray;
}

const Education = (props: TProps): JSX.Element => {
    const dispatch = useDispatch();

    const _updateEducation = (data: KeyValueObjectArray): void => {
        const storeReorder = Util.mapOrder(props.data, data, 'id');
        dispatch(updateEducation(storeReorder));
    };

    const _addNewItem = (): void => {
        dispatch(addEducation());
    };

    const _removeItem = (id: string, data: KeyValueObjectArray): void => {
        Toast.showUndo(id, data, 'education', 'Education Item Removed');
        dispatch(deleteEducationData(id));
    };

    return (
        <Dnd
            data={props.data}
            reorder={(data: KeyValueObjectArray) => _updateEducation(data)}
            additem={_addNewItem}
            removeitem={(id: string) => _removeItem(id, props.data)}
            renderItem={(item: KeyValueObject) => (
                <div style={{ background: '#fff' }}>
                    <Text
                        value={item.title}
                        statename="education.title"
                        stateid={item.id}
                        placeholder="BSc. Software Engineering Harvard"
                    />
                    <Text
                        value={item.date}
                        statename="education.date"
                        stateid={item.id}
                        customclass={styles.educationExplain}
                        placeholder="2010 - 2014"
                    />
                </div>
            )}
        />
    );
};

/* Export Component =============================== */
export default Education;
