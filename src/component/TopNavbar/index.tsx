import React from 'react';
import Tippy from '@tippyjs/react';
import Switch from 'react-switch';
import Link from 'next/link';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

import download from 'downloadjs';

import AppConfig from '../../constant/config';

import { updateTheme, updateItemStatus, exportUserData, importUserData } from '../../redux/core/actions';
import { Loading } from '@component';

import { APIConfig } from '@constant';
import styles from './topNavbar.module.scss';

import { TProps, TState } from './topNavbar';

const initialState: TState = {
    colorPicker: false,
    bgComplete: false,
    checked: false,
    sectionStatus: false,
    colorStatus: false,
    typoStatus: false,
    saveModal: false,
    loadModal: false,
    uploadErrMsg: false,
    gifGenerateStatus: false,
};

const TopNavbar = (props: TProps) => {
    const [state, setState] = useState<TState>(initialState);
    const dispatch = useDispatch();

    const fonts: string[] = ['Source Sans Pro', 'Josefin Sans', 'Calibri', 'Cambria', 'Garamond', 'Georgia'];

    const handleChangeComplete = (color: string) => {
        const data = {
            color: color,
        };
        dispatch(updateTheme(data));
    };

    const handleTypoChange = (font: string) => {
        const data = {
            fontFamily: font,
        };
        dispatch(updateTheme(data));
    };

    const _colorBtnPress = () => {
        setState({
            ...state,
            bgComplete: !state.bgComplete,
            colorStatus: !state.colorStatus,
        });
    };

    const _sectionBtnPress = () => {
        setState({
            ...state,
            bgComplete: !state.bgComplete,
            sectionStatus: !state.sectionStatus,
        });
    };

    const _typoBtnPress = () => {
        setState({
            ...state,
            bgComplete: !state.bgComplete,
            typoStatus: !state.typoStatus,
        });
    };

    const _bgPress = () => {
        setState({
            ...state,
            bgComplete: false,
        });
    };

    const _downloadPDFBtnPress = async () => {
        const { userData } = props;
        const data = dispatch(exportUserData());
        const fileName = `CV-${userData.name}.pdf`;

        setState({ ...state, gifGenerateStatus: true });

        const req = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };

        const res = await fetch(`${APIConfig.hostname}/download`, req);
        const blob = await res.blob();
        setState({ ...state, gifGenerateStatus: false });
        download(blob, fileName);
    };

    const _updateItemStatus = (name: string, status: boolean) => {
        const data = {
            [name]: status,
        };
        dispatch(updateItemStatus(data));
    };

    const _switchBtnClick = (name: string) => {
        const { itemStatus } = props;
        _updateItemStatus(name, !itemStatus[name]);
    };

    const _saveBtnPress = async () => {
        const { userData } = props;
        const dispatch = useDispatch();
        const data = dispatch(exportUserData());
        const fileName = `CV-${userData.name}`;
        const json = JSON.stringify(data);
        const blob = new Blob([json], { type: 'application/json' });
        const href = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = fileName + '.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const _switchBtn = (name: string) => {
        const { itemStatus, theme } = props;
        return (
            <Switch
                onChange={() => _updateItemStatus(name, !itemStatus[name])}
                checked={itemStatus[name]}
                uncheckedIcon={false}
                checkedIcon={false}
                activeBoxShadow="0px 0px 0px 0px #ffffff00"
                width={40}
                height={20}
                offColor="#aaa"
                onColor={theme.color}
            />
        );
    };

    const _colorStatusTippyContent = () => {
        const { theme } = props;
        return (
            <div className={styles.topNavbarCirclePicker}>
                {AppConfig.materialColors.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className={[styles.colorCircleItem, item === theme.color && styles.colorCircleItemActive].join(' ')}
                            style={{
                                background: item,
                                borderColor: item,
                            }}
                            onClick={() => handleChangeComplete(item)}
                        />
                    );
                })}

                <div className={styles.colorInput}>
                    <input
                        type="text"
                        value={theme.color}
                        style={{ color: theme.color }}
                        onChange={(e) => handleChangeComplete(e.target.value)}
                    />
                </div>
            </div>
        );
    };

    const _typoStatusTippyContent = () => {
        const { theme } = props;
        return (
            <div className={styles.typoContent}>
                {fonts.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className={styles.typoContentItem}
                            style={{
                                fontFamily: item,
                                color: theme.fontFamily === item ? '#000' : '#444',
                                fontWeight: theme.fontFamily === item ? 700 : 400,
                                fontSize: theme.fontFamily === item ? '19px' : '17px',
                            }}
                            onClick={() => handleTypoChange(item)}
                        >
                            {item}
                        </div>
                    );
                })}
            </div>
        );
    };

    const _setcionTippyContent = () => {
        return (
            <div className={styles.sectionBox}>
                <div className={styles.sectionLeft}>
                    <div className={styles.sectionItem}>
                        {_switchBtn('picture')}
                        <span className={styles.sectionItemText} onClick={() => _switchBtnClick('picture')}>
                            Picture
                        </span>
                    </div>
                    <div className={styles.sectionItem}>
                        {_switchBtn('info')}
                        <span className={styles.sectionItemText} onClick={() => _switchBtnClick('info')}>
                            Info
                        </span>
                    </div>
                    <div className={styles.sectionItem}>
                        {_switchBtn('profile')}
                        <span className={styles.sectionItemText} onClick={() => _switchBtnClick('profile')}>
                            Profile
                        </span>
                    </div>
                </div>
                <div className={styles.sectionRight}>
                    <div className={styles.sectionItem}>
                        {_switchBtn('workExperience')}
                        <span className={styles.sectionItemText} onClick={() => _switchBtnClick('workExperience')}>
                            WorkExperience
                        </span>
                    </div>
                    <div className={styles.sectionItem}>
                        {_switchBtn('education')}
                        <span className={styles.sectionItemText} onClick={() => _switchBtnClick('education')}>
                            Education
                        </span>
                    </div>
                    <div className={styles.sectionItem}>
                        {_switchBtn('skills')}
                        <span className={styles.sectionItemText} onClick={() => _switchBtnClick('skills')}>
                            Skills
                        </span>
                    </div>
                </div>
            </div>
        );
    };

    const uploadFile = async (e: any) => {
        const reg = /(.*?)\.(json)$/;
        e.preventDefault();

        if (!e.target.files[0].name.match(reg)) {
            setState({
                ...state,
                uploadErrMsg: true,
            });
            return;
        }

        const reader = new FileReader();
        reader.onload = async (e: any) => {
            const text = e.target.result;
            importUserData(JSON.parse(text));
            setState({
                ...state,
                loadModal: false,
            });
        };
        reader.onerror = (error) => console.log(error);
        reader.readAsText(e.target.files[0]);
    };

    const { theme } = props;
    const { bgComplete } = state;

    return (
        <>
            {bgComplete && <div className={styles.bgComplete} onClick={_bgPress} />}
            <div className={styles.TopNavbar}>
                <Tippy
                    visible={state.colorStatus}
                    onClickOutside={() => setState({ ...state, colorStatus: false, bgComplete: !state.bgComplete })}
                    className="customTippy colorTippy"
                    content={_colorStatusTippyContent()}
                    interactive={true}
                    delay={200}
                    duration={[400, 200]}
                    maxWidth={160}
                    placement="bottom"
                    arrow
                >
                    <div className={[styles.item, styles.tonNavbarBorderRight, styles.tonNavbarFelx1].join(' ')} onClick={_colorBtnPress}>
                        <div className={[styles.topNavbarColor].join(' ')}>
                            <div className={styles.topPart} style={{ color: theme.color }}>
                                {/* <i className="material-icons">color_lens</i> */}
                                <i className="material-icons">colorize</i>
                                {/* <i className="material-icons">brush</i> */}
                            </div>

                            <div className={styles.bottomPart}>Color</div>
                        </div>
                    </div>
                </Tippy>

                <Tippy
                    visible={state.typoStatus}
                    onClickOutside={() => setState({ ...state, typoStatus: false, bgComplete: !state.bgComplete })}
                    className="customTippy typoTippy"
                    content={_typoStatusTippyContent()}
                    interactive={true}
                    delay={200}
                    duration={[400, 200]}
                    maxWidth={250}
                    placement="bottom"
                    arrow
                >
                    <div
                        className={[styles.item, styles.tonNavbarBorderRight, styles.tonNavbarFelx1].join(' ')}
                        onClick={_typoBtnPress}
                        style={{ flex: 1.2 }}
                    >
                        <div className={[styles.topNavbarTypography].join(' ')}>
                            <div className={styles.topPart}>
                                <i className="material-icons">font_download</i>
                            </div>
                            <div className={styles.bottomPart}>Typography</div>
                        </div>
                    </div>
                </Tippy>

                <Tippy
                    visible={state.sectionStatus}
                    onClickOutside={() => setState({ ...state, sectionStatus: false, bgComplete: !state.bgComplete })}
                    className="customTippy sectionTippy"
                    content={_setcionTippyContent()}
                    interactive={true}
                    delay={200}
                    duration={[400, 200]}
                    maxWidth={600}
                    placement="bottom"
                    arrow
                >
                    <div className={[styles.item, styles.tonNavbarBorderRight, styles.tonNavbarFelx1].join(' ')} onClick={_sectionBtnPress}>
                        <div className={styles.topNavbarSection}>
                            <div className={styles.topPart}>
                                <i className="material-icons">vertical_split</i>
                            </div>
                            <div className={styles.bottomPart}>Section</div>
                        </div>
                    </div>
                </Tippy>

                <div
                    className={[styles.item, styles.tonNavbarBorderRight, styles.tonNavbarFelx1].join(' ')}
                    onClick={() => setState({ ...state, saveModal: true })}
                >
                    <div className={styles.topNavbarSave}>
                        <div className={styles.topPart}>
                            <i className="material-icons">save</i>
                        </div>
                        <div className={styles.bottomPart}>Save</div>
                    </div>
                </div>

                <div
                    className={[styles.item, styles.tonNavbarBorderRight, styles.tonNavbarFelx1].join(' ')}
                    onClick={() => setState({ ...state, loadModal: true })}
                >
                    <div className={styles.topNavbarLoad}>
                        <div className={styles.topPart}>
                            <i className="material-icons">insert_drive_file</i>
                        </div>
                        <div className={styles.bottomPart}>Load</div>
                    </div>
                </div>

                <Link href="/preview">
                    <div className={[styles.item, styles.tonNavbarBorderRight, styles.tonNavbarFelx1].join(' ')}>
                        <div className={styles.topNavbarPreview}>
                            <div className={styles.topPart}>
                                <i className="material-icons">visibility</i>
                            </div>
                            <div className={styles.bottomPart}>Preview</div>
                        </div>
                    </div>
                </Link>

                <div className={[styles.item, styles.tonNavbarFelx2].join(' ')} onClick={_downloadPDFBtnPress}>
                    <div className={styles.topNavbarDownlaod}>
                        <div className={styles.topPart}>
                            <i className="material-icons">picture_as_pdf</i>
                        </div>
                        <div className={styles.bottomPart}>Export PDF</div>
                    </div>
                </div>
            </div>

            <Modal
                show={state.saveModal}
                onHide={() => setState({ ...state, saveModal: false })}
                dialogClassName="modal-90w"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <h3 className="modal-title w-100 text-center">Save Your Data</h3>
                </Modal.Header>
                <Modal.Body>
                    <div className={styles.saveModal}>
                        <p>By storing your information, in the future you can use it to edit your resume.</p>

                        <div
                            className={styles.saveModalBtn}
                            onClick={() => {
                                _saveBtnPress();
                                setState({ ...state, saveModal: false });
                            }}
                        >
                            SAVE
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal
                show={state.loadModal}
                onHide={() => setState({ ...state, loadModal: false })}
                dialogClassName="modal-90w"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <h3 className="modal-title w-100 text-center">Upload Your Data</h3>
                </Modal.Header>
                <Modal.Body>
                    <div className={styles.loadModal}>
                        <p>You can re-edit your information by uploading your saved file.</p>
                        <div className={styles.uploadModalBtn}>
                            <label htmlFor="uploadFile">CHOOSE FILE</label>
                        </div>
                        <input
                            type="file"
                            id="uploadFile"
                            className={styles.uploadModalFileType}
                            accept="application/JSON"
                            onChange={(e) => {
                                setState({ ...state, uploadErrMsg: false });
                                uploadFile(e);
                            }}
                            onClick={(e: any) => {
                                e.target.value = null;
                            }}
                        />
                        {state.uploadErrMsg && <span>Uploaded file format is wrong</span>}
                    </div>
                </Modal.Body>
            </Modal>

            <Loading show={state.gifGenerateStatus} />
        </>
    );
};

/* Export Component =============================== */
export default TopNavbar;
