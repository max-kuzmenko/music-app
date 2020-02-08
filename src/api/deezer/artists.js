import fetch from './fetch';


export const fetchArtistsByName = async (name) => {
    const response = await fetch.get('/search/artist', { q: name });
    return response && response.data;
}
