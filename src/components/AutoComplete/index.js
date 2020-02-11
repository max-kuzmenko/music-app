import React from 'react';
import PropTypes from 'prop-types';

import Scrollbars from 'react-custom-scrollbars';

import classSet from 'classnames';

import Input from 'components/Input';

import debounce from 'utils/debounce';

import classes from './style.scss';


class AutoComplete extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '', isFocused: false };

        this.debouncedTriggerSearch = debounce(this.triggerSearch.bind(this), 500);
        this.triggerSelect = this.triggerSelect.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    triggerSearch(query) {
        this.props.onSearch(query);
    }

    triggerSelect(option) {
        this.props.onSelect(option.id, option);
        this.setState({ isFocused: false, value: '' });
    }

    onChange(e) {
        const value = e.target.value;
        this.setState({ value });
        this.debouncedTriggerSearch(value);
    }

    onFocus(e) {
        this.setState({ isFocused: true });
        if(!this.props.onFocus) return;
        this.props.onFocus(e);
    }

    onBlur(e) {
        this.setState({ isFocused: false });
        if(!this.props.onBlur) return;
        this.props.onBlur(e);
    }

    render() {
        const { value, isFocused } = this.state;
        const { options, renderOption, inputProps } = this.props;

        return (
            <div
                tabIndex="0"
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                className={classes.AutoCompleteWrapper}
            >
                <Input
                    value={value}
                    onChange={this.onChange}
                    {...inputProps}
                />
                <div
                    className={classSet({
                        [classes.OptionsList]: true,
                        [classes.Visible]: isFocused,
                    })}
                >
                    <Scrollbars
                        autoHeight
                        width="100%"
                        autoHeightMax="400px"
                    >
                        {options.map(option => (
                            <div
                                key={option.id}
                                className={classes.Option}
                                onClick={() => this.triggerSelect(option)}
                            >
                                {renderOption(option)}
                            </div>
                        ))}
                    </Scrollbars>
                </div>
            </div>
        );
    }
};

AutoComplete.propTypes = {
    options: PropTypes.array.isRequired,
    inputProps: PropTypes.object.isRequired,
    onSearch: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    renderOption: PropTypes.func,
};

AutoComplete.defaultProps = {
    renderOption: ({ name }) => name,
}

export default AutoComplete;
