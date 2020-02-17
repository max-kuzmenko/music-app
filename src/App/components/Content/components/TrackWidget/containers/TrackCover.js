import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { getTracksById } from 'store/tracks/selectors';
import { getCurrentTrackId } from 'store/audioState/selectors';


const coverPlaceholderSrc = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/e7981d38-6ee3-496d-a6c0-8710745bdbfc/db6zlbs-68b8cd4f-bf6b-4d39-b9a7-7475cade812f.png';

const TrackCover = ({
    currentTrackId,
    trackById,
}) => {
    const track = trackById[currentTrackId] || null;

    return (
        <img
            alt={track && track.album.name}
            src={(track && track.album.cover_big) || coverPlaceholderSrc}
            style={{ width: '100%', height: '100%' }}
        />
    );
};

TrackCover.propTypes = {
    currentTrackId: PropTypes.number,
    trackById: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    currentTrackId: getCurrentTrackId(state),
    trackById: getTracksById(state),
});

export default connect(mapStateToProps)(TrackCover);
