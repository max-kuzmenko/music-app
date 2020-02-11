import React from 'react';

import { ReactComponent as MusicIcon } from './musicIcon.svg';

import classes from './style.scss';


const Logo = () => (
    <div className={classes.Logo}>
        <MusicIcon fill="currentColor" />
        <span className={classes.LogoText}>
            Music
        </span>
    </div>
);

export default Logo;
