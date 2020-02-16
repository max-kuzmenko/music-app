import React from 'react';
import PropTypes from 'prop-types';

import Loader from "react-loader-spinner";
import { IoIosPlay } from "react-icons/io";

import classSet from 'classnames';

import formatSeconds from 'utils/formatSeconds';

import classes from './style.scss';


const Track = ({ trackIndex, track, isPlaying }) => (
    <div
        className={classSet({
            [classes.Track]: true,
            [classes.Highlighted]: isPlaying,
        })}
    >
        <div className={classes.Icon}>
            {isPlaying ? (
                <Loader
                    color="currentColor"
                    type="Bars"
                    width={18}
                    height={14}
                />
            ) : (
                <div className={classes.Switch}>
                    <span className={classes.TrackIndex}>
                        {trackIndex}
                    </span>
                    <span className={classes.PlayButton}>
                        <IoIosPlay color="currentColor" />
                    </span>
                </div>
            )}
        </div>
        <div className={classes.Title}>
            {track.title}
        </div>
        <div className={classes.TrackDuration}>
            {formatSeconds(track.duration)}
        </div>
    </div>
);

Track.propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    trackIndex: PropTypes.number.isRequired,
    track: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        duration: PropTypes.number.isRequired,
    }).isRequired,
};

export default Track;
