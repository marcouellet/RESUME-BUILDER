import { KeyValueObjectArray } from '../../redux/store';

export interface TProps {
    theme: {
        color: string;
        fontFamily: string;
    };
    userData: {
        name: string;
        infoTitle: string;
        address: string;
        email: string;
        mobile: string;
        userData: string;
        profileTitle: string;
        profile: string;
        workExperienceTitle: string;
        educationTitle: string;
        skillsTitle: string;
    };
    workExperience: KeyValueObjectArray;
    education: KeyValueObjectArray;
    skills: KeyValueObjectArray;
    itemStatus: { [key: string]: boolean };
}
