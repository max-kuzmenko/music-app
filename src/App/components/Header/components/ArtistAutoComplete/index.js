import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Loader from "react-loader-spinner";
import { IoIosSearch } from "react-icons/io";

import AutoComplete from 'components/AutoComplete';

import ArtistOption from './components/ArtistOption';


import classes from './style.scss';


const ArtistAutoComplete = ({ isLoading, options, onSelect, onSearch, history }) => {
    const [currentQuery, setCurrentQuery] = useState('');

    return (
        <div className={classes.ArtistsSearch}>
            <AutoComplete
                onSelect={onSelect}
                onSearch={onSearch}
                options={(options.length || currentQuery) ? options : history}
                renderOption={option => <ArtistOption artist={option} />}
                onChange={setCurrentQuery}
                inputProps={{
                    suffixIcon: isLoading ? (
                        <Loader
                            color="currentColor"
                            type="TailSpin"
                            width={13}
                            height={13}
                        />
                    ) : (
                        <IoIosSearch
                            color="currentColor"
                        />
                    ),
                    placeholder: 'Artist name...',
                    className: classes.SearchInput,
                }}
            />
        </div>
    )
};

ArtistAutoComplete.propTypes = {
    isLoading: PropTypes.bool,
    options: PropTypes.array.isRequired,
    history: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
};

export default ArtistAutoComplete;
