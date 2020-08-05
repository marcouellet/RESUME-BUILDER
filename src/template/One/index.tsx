import React from 'react';
import { Text } from '@component';
import { WorkExperience, Education, Skills, Photo } from './Elements';
import styles from './one.module.scss';
import { TProps } from './one';

const Template = (props: TProps) => {
    return (
        <div className={styles.insideCon}>
            <div>
                <Text value={props.userData.name} statename="userData.name" placeholder="Your Name" customclass={styles.name} />
            </div>
            <div className={styles.underName} style={{ borderTopColor: props.theme.color }} />

            {props.itemStatus.picture && (
                <div className={styles.image}>
                    <Photo userData={props.userData} />
                </div>
            )}

            {props.itemStatus.info && (
                <div className={[styles.info, styles.box].join(' ')}>
                    <Text
                        value={props.userData.infoTitle}
                        statename="userData.infoTitle"
                        placeholder="Personal info"
                        customclass={styles.title}
                        tag="div"
                    />
                    <Text value={props.userData.address} statename="userData.address" placeholder="address: Berlin, Germany" />
                    <Text value={props.userData.email} statename="userData.email" placeholder="sample@email.com" />
                    <Text value={props.userData.mobile} statename="userData.mobile" placeholder="(+1) 123 456 7890" />
                    <Text value={props.userData.userData} statename="userData.userData" placeholder="Your other data" />
                </div>
            )}

            {props.itemStatus.profile && (
                <div className={[styles.profile, styles.box].join(' ')}>
                    <Text
                        value={props.userData.profileTitle}
                        statename="userData.profileTitle"
                        placeholder="Profile"
                        customclass={styles.title}
                        tag="div"
                    />
                    <Text value={props.userData.profile} statename="userData.profile" placeholder="I'm a full-stack developer..." />
                </div>
            )}

            {props.itemStatus.workExperience && (
                <div className={[styles.workExperience, styles.box].join(' ')}>
                    <Text
                        value={props.userData.workExperienceTitle}
                        statename="userData.workExperienceTitle"
                        placeholder="Work experience"
                        customclass={styles.title}
                        tag="div"
                    />
                    <WorkExperience data={props.workExperience} color={props.theme.color} />
                </div>
            )}

            {props.itemStatus.education && (
                <div className={[styles.education, styles.box].join(' ')}>
                    <Text
                        value={props.userData.educationTitle}
                        statename="userData.educationTitle"
                        placeholder="Education"
                        customclass={styles.title}
                        tag="div"
                    />
                    <Education data={props.education} />
                </div>
            )}

            {props.itemStatus.skills && (
                <div className={[styles.skills, styles.box].join(' ')}>
                    <Text
                        value={props.userData.skillsTitle}
                        statename="userData.skillsTitle"
                        placeholder="Skills"
                        customclass={styles.title}
                        tag="div"
                    />

                    <Skills data={props.skills} />
                </div>
            )}
        </div>
    );
};

/* Export Component =============================== */
export default Template;
