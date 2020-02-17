import React from 'react';

import TrackCover from './containers/TrackCover';
import Progress from './containers/Progress';
import Controls from './containers/Controls';

import classes from './styles.scss';


const TrackWidget = () => (
    <div className={classes.TrackWidget}>
        <div className={classes.UpperWidget}>
            <div className={classes.CoverWrapper}>
                <TrackCover />
            </div>
            <div className={classes.ProgressWrapper}>
                <Progress />
            </div>
        </div>
        <div className={classes.Gradient} />
        <div className={classes.Controls}>
            <Controls />
        </div>
    </div>
);

export default TrackWidget;
