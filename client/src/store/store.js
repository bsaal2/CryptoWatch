import React from 'react';
import { Crypto } from './crypto';
import { Wishlist } from './wishlist';

export default class Store {
    constructor() {
        this.Crypto = new Crypto();
        this.Wishlist = new Wishlist();
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