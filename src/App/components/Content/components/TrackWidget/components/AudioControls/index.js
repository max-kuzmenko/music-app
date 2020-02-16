import React from 'react';
import PropTypes from 'prop-types';

import { IoIosSkipForward, IoIosSkipBackward, IoIosPause, IoIosPlay } from "react-icons/io";

import classes from './style.scss';


const AudioControls = ({
    isPlaying,
    setIsPlaying,
    nextTrack,
    prevTrack,
}) => (
    <div className={classes.ControlsWrapper}>
        <IoIosSkipBackward
            onClick={prevTrack}
        />
        {isPlaying ? (
            <IoIosPause
                onClick={() => setIsPlaying(false)}
            />
        ) : (
            <IoIosPlay
                onClick={() => setIsPlaying(true)}
            />
        )}
        <IoIosSkipForward
            fill="currentColor"
            onClick={nextTrack}
        />
    </div>
);

AudioControls.propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    setIsPlaying: PropTypes.func.isRequired,
    nextTrack: PropTypes.func.isRequired,
    prevTrack: PropTypes.func.isRequired,
};

export default AudioControls;
