const axios = require('axios');

class AxiosService {
    GET(url, params={}) {
        return axios.get(url, params);
    }

    POST(url, data={}) {
        return axios.post(url, data);
    }
}

export default AxiosService;
