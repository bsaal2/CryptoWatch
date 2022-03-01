import { makeObservable, observable, runInAction } from 'mobx';

import { CryptoService } from '../services';

export class Crypto {
    cryptoList = [];
    totalRecord = 0;
    loading = false;


    constructor() {
        makeObservable(this, {
            cryptoList: observable,
            totalRecord: observable,
            loading: observable
        });
        this.Crypto = new CryptoService();
    }

    async getAllCrypto(params={}) {
        try {
            this.loading = true;
            const { data } = await this.Crypto.getAllCrypto(params);
            runInAction(() => {
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