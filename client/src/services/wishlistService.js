import AxiosService from './axiosService';
import { API_URL, RESOURCE } from './constant';

class WishlistService {
    constructor() {
        this.Axios = new AxiosService();
    }

    getAllWishlist(params={}) {
        return this.Axios.GET(API_URL + RESOURCE.WISHLIST.GET_ALL, params);
    }

    addWishlist(data={}) {
        return this.Axios.POST(API_URL + RESOURCE.WISHLIST.POST, data);
    }
}

export default WishlistService;