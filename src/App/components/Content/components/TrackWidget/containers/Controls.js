import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { getIsPlaying, getCurrentTrackId, getVolumeLevel } from 'store/audioState/selectors';
import { getTracksById } from 'store/tracks/selectors';
import { getArtistsById } from 'store/artists/selectors';

import { setIsPlayingAction, nextTrackAction, prevTrackAction, setVolumeLevelAction } from 'store/audioState/actions';

import AudioControls from '../components/AudioControls';
import CurrentTrack from '../components/CurrentTrack';
import VolumeControls from '../components/VolumeControls';


const Controls = ({
    isPlaying,
    currentTrackId,
    volumeLevel,
    tracksById,
    artistsById,
    setIsPlaying,
    nextTrack,
    prevTrack,
    setVolume,
}) => {
    return (
        <React.Fragment>
            <AudioControls
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                nextTrack={nextTrack}
                prevTrack={prevTrack}
            />
            <CurrentTrack
                track={tracksById[currentTrackId]}
                artistsById={artistsById}
            />
            <VolumeControls
                currentVolume={volumeLevel}
                setVolume={setVolume}
            />
        </React.Fragment>
    );
};

Controls.propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    currentTrackId: PropTypes.number,
    volumeLevel: PropTypes.number.isRequired,
    tracksById: PropTypes.object.isRequired,
    artistsById: PropTypes.object.isRequired,
    setIsPlaying: PropTypes.func.isRequired,
    nextTrack: PropTypes.func.isRequired,
    prevTrack: PropTypes.func.isRequired,
    setVolume: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    isPlaying: getIsPlaying(state),
    currentTrackId: getCurrentTrackId(state),
    volumeLevel: getVolumeLevel(state),
    tracksById: getTracksById(state),
    artistsById: getArtistsById(state),
});

const mapDispatch = {
    setIsPlaying: setIsPlayingAction,
    nextTrack: nextTrackAction,
    prevTrack: prevTrackAction,
    setVolume: setVolumeLevelAction,
};

export default connect(mapStateToProps, mapDispatch)(Controls);
