import React from 'react';
import PropTypes from 'prop-types';

import { IoIosVolumeHigh } from "react-icons/io";

import Slider from 'components/Slider';

import classes from './style.scss';


const VolumeControls = ({ currentVolume, setVolume }) => (
    <div className={classes.VolumeControls}>
        <IoIosVolumeHigh className={classes.Icon} />
        <Slider
            value={currentVolume}
            onChange={setVolume}
        />
    </div>
);

VolumeControls.propTypes = {
    currentVolume: PropTypes.number.isRequired,
    setVolume: PropTypes.func.isRequired,
};

export default VolumeControls;
