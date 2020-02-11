import React from 'react';

import ArtistAutoComplete from '../components/ArtistAutoComplete';

import { fetchArtistsByName } from 'api/deezer/artists';


class SearchArtist extends React.Component {
    constructor(props) {
        super(props);
        this.state = { options: [] };
        this.onSearch = this.onSearch.bind(this);
    }

    async onSearch(name) {
        if(!name) {
            this.setState({ options: [] });
            return;
        }
        const options = await fetchArtistsByName(name);
        this.setState({ options });
    }

    render() {
        const { options } = this.state;
        return (
            <ArtistAutoComplete
                onSelect={console.log}
                onSearch={this.onSearch}
                options={options}
            />
        );
    }
};

export default SearchArtist;
