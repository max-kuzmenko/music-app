import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { getTracksByArtistId } from 'store/tracks/selectors';
import { getSearchedArtistId } from 'store/artists/selectors';
import { getCurrentTrackId } from 'store/audioState/selectors';

import { setPlaylistAction, playPlaylistTrackAction } from 'store/audioState/actions';

import TracksList from '../components/TracksList';


class Tracks extends React.Component {
    constructor(props) {
        super(props);
        this.onTrackSelect = this.onTrackSelect.bind(this);
    }

    onTrackSelect(trackIndex) {
        const {
            searchedArtistId,
            tracksByArtistId,
            currentTrackId,
            playTrackFromPlaylist,
            setPlaylist
        } = this.props;

        const trackIds = (tracksByArtistId[searchedArtistId] || []).map(({ id }) => id);
        const newTrackId = trackIds[trackIndex];

        if(!newTrackId || newTrackId === currentTrackId) return;

        setPlaylist(trackIds);
        playTrackFromPlaylist(trackIndex);
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
    setPlaylist: PropTypes.func.isRequired,
    playTrackFromPlaylist: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    currentTrackId: getCurrentTrackId(state),
    tracksByArtistId: getTracksByArtistId(state),
    searchedArtistId: getSearchedArtistId(state),
});

const mapDispatch = {
    setPlaylist: setPlaylistAction,
    playTrackFromPlaylist: playPlaylistTrackAction,
};

export default connect(mapStateToProps, mapDispatch)(Tracks);
