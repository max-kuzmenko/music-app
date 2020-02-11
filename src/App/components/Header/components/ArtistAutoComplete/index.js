import React from 'react';
import PropTypes from 'prop-types';

import AutoComplete from 'components/AutoComplete';

import ArtistOption from './components/ArtistOption';
import { ReactComponent as SearchIcon } from './searchIcon.svg';

import classes from './style.scss';


const ArtistAutoComplete = ({ options, onSelect, onSearch }) => (
    <AutoComplete
        onSelect={onSelect}
        onSearch={onSearch}
        options={options}
        renderOption={option => <ArtistOption artist={option} />}
        inputProps={{
            suffixIcon: <SearchIcon fill="currentColor" />,
            placeholder: 'Artist name...',
            className: classes.SearchInput,
        }}
    />
);

ArtistAutoComplete.propTypes = {
    options: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
};

export default ArtistAutoComplete;
