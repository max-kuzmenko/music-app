import React from 'react';
import PropTypes from 'prop-types';

import { Scrollbars } from 'react-custom-scrollbars';

import Track from './Track';

import classes from './style.scss';


const TracksList = ({ currentTrackId, tracks, onTrackSelect }) => {
    if(!tracks.length) {
        return (
            <div className={classes.EmptyMessage}>
                Search for your favourite artist to see playlist.
            </div>
        )
    }

    return (
        <Scrollbars
            height="100%"
            width="100%"
            className={classes.TracksListWrapper}
        >
            <ul className={classes.TracksList}>
                {tracks.map((track, index) => (
                    <li
                        key={track.id}
                        className={classes.Item}
                        onClick={() => onTrackSelect(index)}
                    >
                        <Track
                            isPlaying={currentTrackId === track.id}
                            trackIndex={index + 1}
                            track={track}
                        />
                    </li>
                ))}
            </ul>
        </Scrollbars>
    )
};

TracksList.propTypes = {
    currentTrackId: PropTypes.number,
    tracks: PropTypes.array.isRequired,
    onTrackSelect: PropTypes.func.isRequired,
};

export default TracksList;
