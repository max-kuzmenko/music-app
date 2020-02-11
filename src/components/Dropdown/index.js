import React from 'react';
import PropTypes from 'prop-types';

import RcDropdown from 'rc-dropdown';
import Scrollbars from 'react-custom-scrollbars';

import 'rc-dropdown/assets/index.css';

import OptionsList from './OptionsList';

import classes from './style.scss';


const Dropdown = ({ trigger, options, children, getPopupContainer }) => (
    <RcDropdown
        trigger={[trigger]}
        overlayClassName={classes.Overlay}
        overlay={(
            <div>
                <Scrollbars
                    autoHeight
                    width="100%"
                    autoHeightMax="400px"
                >
                    {options}
                </Scrollbars>
            </div>
        )}
        getPopupContainer={getPopupContainer}
    >
        {children}
    </RcDropdown>
);

Dropdown.propTypes = {
    trigger: PropTypes.string,
    options: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
    getPopupContainer: PropTypes.func,
};

Dropdown.defaultProps = {
    trigger: 'click',
}

export { OptionsList as Options };

export default Dropdown;
