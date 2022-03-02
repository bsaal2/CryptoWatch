import AxiosService from './axiosService';
import { API_URL, RESOURCE } from './constant';

class CryptoService {
    constructor() {
        this.Axios = new AxiosService();
    }

    getAllCrypto(params={}) {
        return this.Axios.GET(API_URL + RESOURCE.CRYPTO.GET_ALL, params);
    }

    addWishlist(data={}) {
        return this.Axios.POST(API_URL + RESOURCE.WISHLIST.POST, data);
    }
}

export default CryptoService;