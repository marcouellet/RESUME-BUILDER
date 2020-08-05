export type KeyValueObject = { [key: string]: string };
export type KeyValueObjectArray = KeyValueObject[];

export interface DndItem {
    id: string;
    content: string;
}

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
    itemStatus: KeyValueObject;
}
