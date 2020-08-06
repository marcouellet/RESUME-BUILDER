import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserData, updateWorkExperienceData, updateEducationData, updateSkillData } from '../../redux/core/actions';

import { Util } from '@lib';

import styles from './text.module.scss';

type DivProps = JSX.IntrinsicElements['p'];

interface TProps extends DivProps {
    statename: string;
    stateid: any;
    value: any;
    customclass: any;
    tag: any;
}

const defaultProps: TProps = {
    statename: '',
    stateid: 1,
    value: '',
    customclass: '',
    tag: 'p',
};

const Text = (props: TProps) => {
    const [editable, setEditable] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        if (Util.editable()) {
            setEditable(true);
            return;
        }
        setEditable(false);
    }, []);

    const _onBlur = (e: any) => {
        const { statename, stateid } = props;
        const storeComponents = statename.split('.');

        const data = {
            [storeComponents[1]]: e.textContent ? e.innerHTML : '',
        };

        if (storeComponents[0] === 'userData') {
            dispatch(updateUserData(data));
        } else if (storeComponents[0] === 'workExperience') {
            dispatch(updateWorkExperienceData(stateid, data));
        } else if (storeComponents[0] === 'education') {
            dispatch(updateEducationData(stateid, data));
        } else if (storeComponents[0] === 'skills') {
            dispatch(updateSkillData(stateid, data));
        }
    };

    const { value, customclass, tag } = props;
    const TagName = tag ? tag : 'p';
    return (
        <>
            <TagName
                contentEditable={editable}
                suppressContentEditableWarning="true"
                onBlur={(e: any) => _onBlur(e.currentTarget)}
                dangerouslySetInnerHTML={{ __html: value }}
                className={styles.contentEditableContainer + ' ' + customclass}
                {...(props as any)}
            />
        </>
    );
};

Text.defaultProps = defaultProps;

export default Text;
