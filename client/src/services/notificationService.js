import AxiosService from './axiosService';
import { API_URL, RESOURCE } from './constant';

class NotificationService {
    constructor() {
        this.Axios = new AxiosService();
    }

    getNotificationCount() {
        return this.Axios.GET(API_URL + RESOURCE.NOTIFICATION.GET_COUNT);
    }

    getAllNotification(params={}) {
        return this.Axios.GET(API_URL + RESOURCE.NOTIFICATION.GET_ALL, params);
    }

    removeNotification(id) {
        return this.Axios.DELETE(API_URL + RESOURCE.NOTIFICATION.DELETE + id);
    }
}

export default NotificationService;