import React from 'react';

import Logo from 'components/Logo'

import SearchArtist from './containers/SearchArtist'

import classes from './style.scss';


const Header = () => (
    <header className={classes.Header}>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <SearchArtist />
    </header>
);

export default Header;
