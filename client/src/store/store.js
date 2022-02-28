import React from 'react';
import { Crypto } from './crypto';

export default class Store {
    constructor() {
        this.cryptoObj = new Crypto();
    }
}

export const DataContext = React.createContext();

export const StoreProvider = ({ children, store }) => {
    return (
        <DataContext.Provider value={store}>
            {children}
        </DataContext.Provider>
    );
}