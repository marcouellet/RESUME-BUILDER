import ActionTypes from './actionTypes';
import Util from '../../lib/Util';
import AppConfig from '../../constant/config';
import ApiConst from '../../constant/api';
import { appStore } from '../store';

export const updateUserData = (data: any): any => {
    return {
        type: ActionTypes.UPDATE_USER_DATA,
        payload: data,
    };
};

export const updateTheme = (data: any): any => {
    return {
        type: ActionTypes.UPDATE_THEME,
        payload: data,
    };
};

export const updateItemStatus = (data: any): any => {
    return {
        type: ActionTypes.UPDATE_ITEM_STATUS,
        payload: data,
    };
};

export const updateWorkExperience = (data: any): any => {
    return {
        type: ActionTypes.UPDATE_WORK_EXPERIENCE,
        payload: data,
    };
};

export const addNewWorkExperience = (): any => {
    const id = Util.randomId();
    const data = {
        id,
        date: '',
        jobTitle: '',
        companyName: '',
        companyText: '',
        experienceText: '',
    };

    return {
        type: ActionTypes.ADD_NEW_WORK_EXPERIENCE,
        payload: data,
    };
};

export const updateWorkExperienceData = (id: string, data: any): any => {
    return {
        type: ActionTypes.UPDATE_WORK_EXPERIENCE_DATA,
        payloadId: id,
        payload: data,
    };
};

export const deleteWorkExperienceData = (id: string): any => {
    return {
        type: ActionTypes.DELETE_WORK_EXPERIENCE_DATA,
        payload: id,
    };
};

export const addDeletedWorkExperienceItem = (data: any): any => {
    return {
        type: ActionTypes.ADD_DELETED_WORK_EXPERIENCE_ITEM,
        payload: data,
    };
};

export const addEducation = (): any => {
    const id = Util.randomId();
    const data = {
        id,
        date: '',
        title: '',
    };

    return {
        type: ActionTypes.ADD_NEW_EDUCATION,
        payload: data,
    };
};

export const updateEducation = (data: any): any => {
    return {
        type: ActionTypes.UPDATE_EDUCATION,
        payload: data,
    };
};

export const updateEducationData = (id: string, data: any): any => {
    return {
        type: ActionTypes.UPDATE_EDUCATION_DATA,
        payloadId: id,
        payload: data,
    };
};

export const deleteEducationData = (id: string): any => {
    return {
        type: ActionTypes.DELETE_EDUCATION_DATA,
        payload: id,
    };
};

export const addDeletedEducationItem = (data: any): any => {
    return {
        type: ActionTypes.ADD_DELETED_WORK_EDUCATION_ITEM,
        payload: data,
    };
};

export const addSkill = (): any => {
    const id = Util.randomId();
    const data = {
        id,
        title: '',
    };

    return {
        type: ActionTypes.ADD_NEW_SKILL,
        payload: data,
    };
};

export const updateSkill = (data: any): any => {
    return {
        type: ActionTypes.UPDATE_SKILL,
        payload: data,
    };
};

export const updateSkillData = (id: string, data: any): any => {
    return {
        type: ActionTypes.UPDATE_SKILL_DATA,
        payloadId: id,
        payload: data,
    };
};

export const deleteSkillData = (id: string): any => {
    return {
        type: ActionTypes.DELETE_SKILL_DATA,
        payload: id,
    };
};

export const addDeletedSkillItem = (data: any): any => {
    return {
        type: ActionTypes.ADD_DELETED_WORK_SKILL_ITEM,
        payload: data,
    };
};

export const exportUserData = () => {
    return function (_: any, getState: () => any): any[] {
        const userData = getState().userData;
        const workExperience = getState().workExperience;
        const education = getState().education;
        const skills = getState().skills;
        const theme = getState().theme;
        const itemStatus = getState().itemStatus;

        let data = [];
        data = [userData, workExperience, education, skills, theme, itemStatus];

        return data;
    };
};

export const importUserData = (data: any): void => {
    // const obj = JSON.parse(data)
    const obj = data;

    appStore.dispatch(updateUserData(obj.userData));
    appStore.dispatch(updateWorkExperience(obj.workExperience));
    appStore.dispatch(updateEducation(obj.education));
    appStore.dispatch(updateSkill(obj.skills));
    appStore.dispatch(updateTheme(obj.theme));
    appStore.dispatch(updateItemStatus(obj.itemStatus));
};

export const uploadImageAction = (image: any) => {
    return (): Promise<any> =>
        new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('image', image);
            fetch(ApiConst.imgurHostname, {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: `Client-ID ${AppConfig.imgurClientId}`,
                },
            })
                .then((response) => response.json())
                .then((res) => {
                    return resolve(res);
                })
                .catch((err) => {
                    return reject(err);
                });
        });
};
