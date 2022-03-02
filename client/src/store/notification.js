import { makeObservable, observable, runInAction, action } from 'mobx';

import { NotificationService } from '../services';

export class Notification {
    notificationList = [];
    totalRecord = 0;
    page = 0;
    message = '';
    loading = false;


    constructor() {
        makeObservable(this, {
            notificationList: observable,
            totalRecord: observable,
            page: observable,
            loading: observable,
            setPage: action,
            resetData: action
        });
        this.Notification = new NotificationService();
    }

    resetData() {
        this.message = ''
        this.loading = false;
        this.totalRecord = 0;
        this.notificationList = [];
    }

    setPage(page) {
        this.page = page;
    }

    async getNotificationCount() {
        try {
            this.loading = true;
            const { data } = await this.Notification.getNotificationCount();
            runInAction(() => {
                this.totalRecord = data.totalRecord;
                this.loading = false;
            });
        }
        catch (error) {
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    async getAllNotification(page) {
        try {
            this.loading = true;
            const params = { params: { page, pageSize: 10 }};
            const { data } = await this.Notification.getAllNotification(params);
            runInAction(() => {
                this.page = page;
                this.notificationList = data.data;
                this.totalRecord = data.totalRecord;
                this.loading = false;
            });
        }
        catch (error) {
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    async removeNotification(id) {
        try {
            this.loading = true;
            const { data } = await this.Notification.removeNotification(id);
            runInAction(() => {
                this.message = data.message;
                this.notificationList = this.notificationList.filter(each => each.id !== id);
                this.loading = false;
            });
        }
        catch (error) {
            runInAction(() => {
                this.message = error.message;
                this.loading = false;
            });
        }
    }
}