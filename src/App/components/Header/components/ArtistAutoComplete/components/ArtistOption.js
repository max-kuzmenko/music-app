import React from 'react';
import PropTypes from 'prop-types';

import classes from './style.scss';

const ArtistOption = ({ artist }) => (
    <div className={classes.ArtistOption}>
        <div className={classes.ArtistPicture}>
            <img src={artist.picture} />
        </div>
        <span className={classes.Ellipsis}>
            {artist.name}
        </span>
    </div>
);

ArtistOption.propTypes = {
    artist: PropTypes.shape({
        name: PropTypes.string.isRequired,
        picture_small: PropTypes.string.isRequired,
    }).isRequired,
};

export default ArtistOption;
