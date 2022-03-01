import { makeObservable, observable, runInAction, action } from 'mobx';

import { CryptoService } from '../services';

export class Crypto {
    cryptoList = [];
    totalRecord = 0;
    page = 0;
    loading = false;


    constructor() {
        makeObservable(this, {
            cryptoList: observable,
            totalRecord: observable,
            page: observable,
            loading: observable,
            setPage: action
        });
        this.Crypto = new CryptoService();
    }

    setPage(page) {
        this.page = page;
    }

    async getAllCrypto(page) {
        try {
            this.loading = true;
            const params = { params: { page, pageSize: 10 }};
            const { data } = await this.Crypto.getAllCrypto(params);
            runInAction(() => {
                this.page = page;
                this.cryptoList = data.data;
                this.totalRecord = data.totalRecord;
            });
        }
        catch (error) {
            runInAction(() => {
                this.loading = false;
            });
        }
    }
}