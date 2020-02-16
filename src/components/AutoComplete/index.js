import React from 'react';
import PropTypes from 'prop-types';

import Downshift from 'downshift'

import Input from 'components/Input';
import Dropdown, { Options } from 'components/Dropdown';

import debounce from 'utils/debounce';

import classes from './style.scss';


class AutoComplete extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '', isFocused: false };

        this.debouncedTriggerSearch = debounce(this.triggerSearch.bind(this), 500);
        this.triggerSelect = this.triggerSelect.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    triggerSearch(query) {
        this.props.onSearch(query);
    }

    triggerSelect(option) {
        this.props.onSelect(option.id, option);
        this.setState({ isFocused: false, value: '' });
        this.props.onChange('');
    }

    onChange(e) {
        const value = e.target.value;
        this.setState({ value });
        this.debouncedTriggerSearch(value);
        this.props.onChange(value);
    }

    render() {
        const { value } = this.state;
        const { options, renderOption, inputProps } = this.props;

        return (
            <Downshift
                onChange={this.triggerSelect}
                itemToString={item => item && item.id}
            >
                {({
                    getItemProps,
                    getInputProps,
                    getMenuProps,
                    highlightedIndex,
                }) => (
                    <div className={classes.AutoCompleteWrapper}>
                        <Dropdown
                            options={(
                                <Options
                                    {...getMenuProps(
                                        { refKey: 'innerRef' },
                                        { suppressRefError: true }
                                    )}
                                >
                                    {options.map((option, index) => (
                                        <Options.Item
                                            {...getItemProps({
                                                isHighlighted: index === highlightedIndex,
                                                key: option.id,
                                                item: option,
                                                index,
                                            })}
                                        >
                                            {renderOption(option)}
                                        </Options.Item>
                                    ))}
                                </Options>
                            )}
                            getPopupContainer={(node) => node.parentNode}
                        >
                            <Input
                                {...getInputProps()}
                                value={value}
                                onChange={this.onChange}
                                {...inputProps}
                            />
                        </Dropdown>
                    </div>
                )}
            </Downshift>
        );
    }
};

AutoComplete.propTypes = {
    options: PropTypes.array.isRequired,
    inputProps: PropTypes.object.isRequired,
    onSearch: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    renderOption: PropTypes.func,
};

AutoComplete.defaultProps = {
    renderOption: ({ name }) => name,
}

export default AutoComplete;
