import FetchBase from 'api/FetchBase';

const deezerAPIBaseUrl = process.env.REACT_APP_DEEZER_API_URI;
const deezerAPIKey = process.env.REACT_APP_DEEZER_API_KEY;

const fetch = new FetchBase({
    baseUrl: deezerAPIBaseUrl,
    headers: { 'X-RapidAPI-Key': deezerAPIKey },
});

export default fetch;
