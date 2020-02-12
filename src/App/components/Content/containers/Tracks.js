import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { getTracksByArtistId } from 'store/tracks/selectors';
import { getSearchedArtistId } from 'store/artists/selectors';
import { getCurrentTrackId } from 'store/audioState/selectors';

import { setUpNextTracksAction, playTrackAction } from 'store/audioState/actions';

import TracksList from '../components/TracksList';


class Tracks extends React.Component {
    constructor(props) {
        super(props);
        this.onTrackSelect = this.onTrackSelect.bind(this);
    }

    onTrackSelect(trackIndex) {
        const { searchedArtistId, tracksByArtistId, currentTrackId, playTrack, setUpNext } = this.props;

        const trackIds = (tracksByArtistId[searchedArtistId] || []).map(({ id }) => id);
        const newTrackId = trackIds[trackIndex];

        if(!newTrackId || newTrackId === currentTrackId) return;

        setUpNext(trackIds.slice(trackIndex + 1));
        playTrack(newTrackId);
    }

    render() {
        const { searchedArtistId, tracksByArtistId, currentTrackId } = this.props;

        return (
            <TracksList
                currentTrackId={currentTrackId}
                tracks={tracksByArtistId[searchedArtistId] || []}
                onTrackSelect={this.onTrackSelect}
            />
        )
    }
}

Tracks.propTypes = {
    currentTrackId: PropTypes.number,
    searchedArtistId: PropTypes.number,
    tracksByArtistId: PropTypes.object.isRequired,
    setUpNext: PropTypes.func.isRequired,
    playTrack: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    currentTrackId: getCurrentTrackId(state),
    tracksByArtistId: getTracksByArtistId(state),
    searchedArtistId: getSearchedArtistId(state),
});

const mapDispatch = {
    setUpNext: setUpNextTracksAction,
    playTrack: playTrackAction,
};

export default connect(mapStateToProps, mapDispatch)(Tracks);
