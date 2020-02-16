import React from 'react';
import PropTypes from 'prop-types';

import classes from './style.scss';


const ARTIST_PICTURE_PLACEHOLDER = 'https://www.freeiconspng.com/uploads/artist-music-player-representation-icons--free-download-11.jpg';

const CurrentTrack = ({ track, artistsById }) => {
    if(!track) return null;

    const artist = artistsById[track.artist.id];

    return (
        <div className={classes.CurrentTrack}>
            <div className={classes.CurrentArtistPicture}>
                <img
                    alt="artist"
                    src={artist && artist.picture_small || ARTIST_PICTURE_PLACEHOLDER}
                />
            </div>
            <div>
                <div className={classes.TrackName}>
                    {track.title}
                </div>
                <div className={classes.ArtistName}>
                    {track.artist.name}
                </div>
            </div>
        </div>
    );
};

CurrentTrack.propTypes = {
    artistsById: PropTypes.object.isRequired,
    track: PropTypes.shape({
        duration: PropTypes.number.isRequired,

        album: PropTypes.shape({
            title: PropTypes.string.isRequired,
        }).isRequired,

        artist: PropTypes.shape({
            id: PropTypes.number.isRequired,
        }).isRequired,
    }),
};

export default CurrentTrack;
