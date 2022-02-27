class MemoryStorage {
    cryptoList = [];
    map = new Map();

    addItemInList(item) {
        return this.cryptoList.push(item);
    }

    setItemInMap(key, value) {
        this.map.set(key, value);
    }

    getItemMap(key) {
        return this.map.get(key);
    }
};

module.exports = new MemoryStorage();