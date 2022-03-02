import React from 'react';
import { Crypto } from './crypto';
import { Wishlist } from './wishlist';
import { Notification } from './notification';

export default class Store {
    constructor() {
        this.Crypto = new Crypto();
        this.Wishlist = new Wishlist();
        this.Notification = new Notification();
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