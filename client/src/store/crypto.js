import { makeObservable, observable } from 'mobx';

export class Crypto {
    cryptoList = []
    loading = false


    constructor() {
        makeObservable(this, {
            cryptoList: observable,
            loading: observable
        });
    }
}