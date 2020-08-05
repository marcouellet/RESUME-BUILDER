import React from 'react';
import { useDispatch } from 'react-redux';
import { Toast, Util } from '@lib';
import { Text, Dnd2Column } from '@component';
import { addSkill, updateSkill, deleteSkillData } from '../../../../redux/core/actions';
import { KeyValueObject, KeyValueObjectArray } from '../../../../redux/store';

interface TProps {
    data: KeyValueObjectArray;
}

const Skills = (props: TProps) => {
    const dispatch = useDispatch();

    const _updateSkill = (data: KeyValueObjectArray) => {
        const storeReorder = Util.mapOrder(props.data, data, 'id');
        dispatch(updateSkill(storeReorder));
    };

    const _addNewItem = () => {
        dispatch(addSkill());
    };

    const _removeItem = (id: string, data: KeyValueObjectArray) => {
        Toast.showUndo(id, data, 'skills', 'Skills Item Removed');
        dispatch(deleteSkillData(id));
    };

    return (
        <Dnd2Column
            data={props.data}
            reorder={(data: KeyValueObjectArray) => _updateSkill(data)}
            additem={_addNewItem}
            removeitem={(id: string) => _removeItem(id, props.data)}
            renderItem={(item: KeyValueObject) => (
                <div style={{ background: '#fff' }}>
                    <Text value={item.title} statename="skills.title" stateid={item.id} placeholder="React Native" />
                </div>
            )}
        />
    );
};

/* Export Component =============================== */
export default Skills;
