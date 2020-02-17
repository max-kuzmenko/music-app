import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { getTracksById } from 'store/tracks/selectors';
import { getCurrentTrackId, getIsPlaying } from 'store/audioState/selectors';

import { setPlayingFromPercentAction, setIsPlayingAction, nextTrackAction } from 'store/audioState/actions';

import TrackWidget from '../components/TrackWidget';


const SelectedTrack = ({
    isPlaying,
    currentTrackId,
    trackById,
    setPlayingFromPercent,
    setIsPlaying,
    nextTrack,
}) => {
    const track = trackById[currentTrackId] || null;

    return (
        <TrackWidget
            isPlaying={isPlaying}
            track={track}
            setPlayingFromPercent={setPlayingFromPercent}
            setIsPlaying={setIsPlaying}
            nextTrack={nextTrack}
        />
    );
};

SelectedTrack.propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    currentTrackId: PropTypes.string.isRequired,
    trackById: PropTypes.object.isRequired,
    setPlayingFromPercent: PropTypes.func.isRequired,
    setIsPlaying: PropTypes.func.isRequired,
    nextTrack: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    isPlaying: getIsPlaying(state),
    currentTrackId: getCurrentTrackId(state),
    trackById: getTracksById(state),
});

const mapDispatch = {
    setPlayingFromPercent: setPlayingFromPercentAction,
    setIsPlaying: setIsPlayingAction,
    nextTrack: nextTrackAction,
};

export default connect(mapStateToProps, mapDispatch)(SelectedTrack);
