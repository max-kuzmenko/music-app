import React from 'react';

import { Scrollbars } from 'react-custom-scrollbars';

import classes from './style.scss';

import Tracks from './containers/Tracks';
import TrackWidget from './components/TrackWidget';

const Content = () => (
    <content className={classes.ContentWrapper}>
        <Scrollbars
            width="100%"
            height="100%"
        >
            <div className={classes.Content}>
                <div className={classes.AudioContainer}>
                    <TrackWidget />
                </div>
                <div className={classes.ListContainer}>
                    <Tracks />
                </div>
            </div>
        </Scrollbars>
    </content>
);


export default Content;
