import fetch from './fetch';


export const fetchTracksByArtistId = async (artistId) => {
    const response = await fetch.get(`/artist/${artistId}/top`, { limit: 10 });
    return response && response.data;
}
