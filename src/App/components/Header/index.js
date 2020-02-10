import React, { useState } from 'react';

import Logo from 'components/Logo'
import Input from 'components/Input'

import classes from './style.scss';


const Header = () => {
    const [value, setValue] = useState('');

    return (
        <header className={classes.Header}>
            <Logo />
            <Input
                placeholder="Artist name..."
                className={classes.SearchInput}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </header>
    );
};

export default Header;
