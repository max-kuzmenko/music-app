import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import ArtistAutoComplete from '../components/ArtistAutoComplete';

import { fetchArtistsByName } from 'api/deezer/artists';

import { fetchTracksByArtistIdAction } from 'store/tracks/actions';
import { setSearchedArtistAction, addArtistsAction } from 'store/artists/actions';

import { getLastSearchedArtists } from 'store/artists/selectors';


class SearchArtist extends React.Component {
    constructor(props) {
        super(props);
        this.state = { options: [], isLoading: false };
        this.onSearch = this.onSearch.bind(this);
        this.onArtistSelect = this.onArtistSelect.bind(this);
    }

    async onSearch(name) {
        if(!name) {
            this.setState({ options: [] });
            return;
        }
        this.setState({ isLoading: true });
        const options = await fetchArtistsByName(name);
        this.setState({ options, isLoading: false });
    }

    onArtistSelect(artistId, artist) {
        this.setState({ options: [] });

        this.props.fetchTracksByArtistId(artistId);
        this.props.setSearchedArtist(artistId);
        this.props.addArtists([artist]);
    }

    render() {
        const { options, isLoading } = this.state;
        const { lastSearchedArtists } = this.props;

        return (
            <ArtistAutoComplete
                isLoading={isLoading}
                onSelect={this.onArtistSelect}
                onSearch={this.onSearch}
                history={lastSearchedArtists}
                options={options}
            />
        );
    }
};

SearchArtist.propTypes = {
    lastSearchedArtists: PropTypes.array.isRequired,
    fetchTracksByArtistId: PropTypes.func.isRequired,
    setSearchedArtist: PropTypes.func.isRequired,
    addArtists: PropTypes.func.isRequired,
};

const mapDispatchToProps = state => ({
    lastSearchedArtists: getLastSearchedArtists(state),
});

const mapDispatch = {
    fetchTracksByArtistId: fetchTracksByArtistIdAction,
    setSearchedArtist: setSearchedArtistAction,
    addArtists: addArtistsAction,
};

export default connect(mapDispatchToProps, mapDispatch)(SearchArtist);
