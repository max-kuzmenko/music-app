import axios from 'axios';


class FetchBase {
    constructor({ headers, baseUrl }) {
        this.headers = headers || {};
        this.baseUrl = baseUrl || '';
    };

    setHeader(name, value) {
        this.headers[name] = value;
    }

    async get(routeUrl, params) {
        const response = await axios({
            method: 'get',
            headers: this.headers,
            url: `${this.baseUrl}${routeUrl}`,
            params,
        });
        return response && response.data;
    }

    async post(routeUrl, data) {
        const response = await axios({
            method: 'post',
            headers: this.headers,
            url: `${this.baseUrl}${routeUrl}`,
            data,
        });
        return response && response.data;
    }
}

export default FetchBase;
