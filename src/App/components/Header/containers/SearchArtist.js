import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import ArtistAutoComplete from '../components/ArtistAutoComplete';

import { fetchArtistsByName } from 'api/deezer/artists';

import { fetchTracksByArtistIdAction } from 'store/tracks/actions';
import { setSearchedArtistAction, addArtistsAction } from 'store/artists/actions';


class SearchArtist extends React.Component {
    constructor(props) {
        super(props);
        this.state = { options: [] };
        this.onSearch = this.onSearch.bind(this);
        this.onArtistSelect = this.onArtistSelect.bind(this);
    }

    async onSearch(name) {
        if(!name) {
            this.setState({ options: [] });
            return;
        }
        const options = await fetchArtistsByName(name);
        this.setState({ options });
    }

    onArtistSelect(artistId, artist) {
        this.setState({ options: [] });

        this.props.fetchTracksByArtistId(artistId);
        this.props.setSearchedArtist(artistId);
        this.props.addArtists([artist]);
    }

    render() {
        const { options } = this.state;
        return (
            <ArtistAutoComplete
                onSelect={this.onArtistSelect}
                onSearch={this.onSearch}
                options={options}
            />
        );
    }
};

SearchArtist.propTypes = {
    fetchTracksByArtistId: PropTypes.func.isRequired,
    setSearchedArtist: PropTypes.func.isRequired,
    addArtists: PropTypes.func.isRequired,
};

const mapDispatch = {
    fetchTracksByArtistId: fetchTracksByArtistIdAction,
    setSearchedArtist: setSearchedArtistAction,
    addArtists: addArtistsAction,
};

export default connect(null, mapDispatch)(SearchArtist);
