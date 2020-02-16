import React from 'react';
import PropTypes from 'prop-types';

import 'rc-slider/assets/index.css';

import RcSlider from 'rc-slider';

import classes from './style.scss';


const Slider = ({ value, onChange }) => (
    <RcSlider
        value={value}
        className={classes.Slider}
        onChange={onChange}
    />
);

Slider.propTypes = {
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Slider;
