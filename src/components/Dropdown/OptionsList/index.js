import React from 'react';
import PropTypes from 'prop-types';

import classSet from 'classnames';

import classes from './style.scss';


const OptionsList = ({ children, className, ...ulProps }) => (
    <ul
        className={classSet({
            [className]: Boolean(className),
            [classes.OptionsList]: true,
        })}
        {...ulProps}
    >
        {children}
    </ul>
);

const OptionItem = ({ isHighlighted, children, className, ...liProps }) => (
    <li
        className={classSet({
            [className]: Boolean(className),
            [classes.Highlighted]: isHighlighted,
            [classes.OptionsItem]: true,
        })}
        {...liProps}
    >
        {children}
    </li>
);

OptionItem.propTypes = {
    isHighlighted: PropTypes.bool,
}

OptionsList.Item = OptionItem;

export default OptionsList;





