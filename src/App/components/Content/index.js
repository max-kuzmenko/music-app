import React from 'react';

import { Scrollbars } from 'react-custom-scrollbars';

import classes from './style.scss';

import Tracks from './containers/Tracks';

const Content = () => (
    <content className={classes.ContentWrapper}>
        <Scrollbars
            width="100%"
            height="100%"
        >
            <div className={classes.Content}>
                <div className={classes.AudioContainer}>
                </div>
                <div className={classes.ListContainer}>
                    <Tracks />
                </div>
            </div>
        </Scrollbars>
    </content>
);


export default Content;
