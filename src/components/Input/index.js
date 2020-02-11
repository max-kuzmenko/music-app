import React from 'react';
import PropTypes from 'prop-types';

import classSet from 'classnames';

import classes from './style.scss';


const Input = ({ prefixIcon, suffixIcon, className, ...inputProps }) => (
    <div className={classes.InputWrapper}>
        {prefixIcon ? (
            <div className={classSet(classes.Icon, classes.PrefixIcon)}>
                {prefixIcon}
            </div>
        ) : null}
        {suffixIcon ? (
            <div className={classSet(classes.Icon, classes.SuffixIcon)}>
                {suffixIcon}
            </div>
        ) : null}
        <input
            className={classSet(classes.Input, className || '')}
            {...inputProps}
        />
    </div>
);

Input.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    prefixIcon: PropTypes.node,
    suffixIcon: PropTypes.node,
};

export default Input;
