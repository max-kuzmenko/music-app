import React from 'react';
import PropTypes from 'prop-types';

import formatSeconds from 'utils/formatSeconds';

import classes from './style.scss';


const EMPTY_TIME = '--:--';

const PlayingTime = ({ duration, currentTime }) => (
    <div className={classes.TimeWrapper}>
        <div className={classes.CurrentTime}>
            {currentTime ? formatSeconds(currentTime) : EMPTY_TIME}
        </div>
        <div className={classes.Duration}>
            {duration ? formatSeconds(duration) : EMPTY_TIME}
        </div>
    </div>
);

PlayingTime.propTypes = {
    duration: PropTypes.number,
    currentTime: PropTypes.number,
};

export default PlayingTime;
