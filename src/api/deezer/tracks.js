import fetch from './fetch';


export const fetchTracksByArtistId = async (artistId) => {
    const response = await fetch.get(`/artist/${artistId}/top`, { limit: 30 });
    return response && response.data;
}
