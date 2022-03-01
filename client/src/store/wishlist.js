import { makeObservable, observable, runInAction, action } from 'mobx';

import { WishlistService } from '../services';

export class Wishlist {
    wishList = [];
    totalRecord = 0;
    page = 0;
    message = '';
    loading = false;


    constructor() {
        makeObservable(this, {
            wishList: observable,
            totalRecord: observable,
            page: observable,
            loading: observable,
            setPage: action,
            resetData: action
        });
        this.Wishlist = new WishlistService();
    }

    resetData() {
        this.message = ''
        this.loading = false;
    }

    setPage(page) {
        this.page = page;
    }

    async addWishlist(data={}) {
        try {
            this.loading = true;
            await this.Wishlist.addWishlist(data);
            runInAction(() => {
                this.loading = false;
            });
        }
        catch (error) {
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    async getAllWishlist(page) {
        try {
            this.loading = true;
            const params = { params: { page, pageSize: 10 }};
            const { data } = await this.Wishlist.getAllWishlist(params);
            runInAction(() => {
                this.page = page;
                this.wishList = data.data;
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

    async removeWishlist(id) {
        try {
            this.loading = true;
            const { data } = await this.Wishlist.removeWishlist(id);
            runInAction(() => {
                this.message = data.message;
                this.wishList = this.wishList.filter(each => each.id !== id);
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