import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from './select.module.scss';

import { AppStore } from '../../redux/store';
import { updateTheme } from '../../redux/core/actions';

const fonts = ['Source Sans Pro', 'Josefin Sans', 'Calibri', 'Cambria', 'Garamond', 'Georgia'];

const Select = () => {
    const state = useSelector<AppStore>((state) => state) as AppStore;
    const [fontFamily, setFontFamily] = useState(state.theme.fontFamily);
    const dispatch = useDispatch();

    const _onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e && e.target && e.target.value;
        const data = {
            fontFamily: value,
        };
        setFontFamily(value);
        dispatch(updateTheme(data));
    };

    return (
        <div className={styles.selectBoxForm}>
            <select value={fontFamily} onChange={(e) => _onChange(e)}>
                {fonts.map((item, index) => {
                    return (
                        <option value={item} key={index} style={{ fontFamily: item }}>
                            {item}
                        </option>
                    );
                })}
            </select>
            <i className={'material-icons ' + styles.selectDown}>arrow_drop_down</i>
        </div>
    );
};

/* Export Component =============================== */
export default Select;
