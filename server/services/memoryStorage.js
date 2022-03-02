/** Helper class to store the data by using the in memory implementation */
class MemoryStorage {
    cryptoList = [];
    wishList = [];
    map = new Map();

    addItemInList(item) {
        return this.cryptoList.push(item);
    }

    addItemInWishlist(item) {
        return this.wishList.push(item);
    }

    removeItemFromWishlist(id) {
        this.wishList = this.wishList.filter(each => each.id !== id);
    }

    setItemInMap(key, value) {
        this.map.set(key, value);
    }

    getItemMap(key) {
        return this.map.get(key);
    }
};

module.exports = new MemoryStorage();