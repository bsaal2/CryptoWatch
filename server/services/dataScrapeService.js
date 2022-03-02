const rp = require('request-promise');
const cheerio = require('cheerio');

const MemoryStorage = require('./memoryStorage');
const { crypto, notification } = require('../models');
const { ACTION, STATUS } = require('./constant');

class DataScrape {

    CURRENCY_SELECTOR = {
        NAME: '.profile__link',
        CODE: '.profile__subtitle',
        LOGO: '.profile__logo',
        PRICE: '.valuta',
        CHANGE: '.change'
    };

    /**
     * Function to insert the scraped data to the db
     * @param {*} list
     * @memberof DataScrape
     */
    insertCryptoListDb = async (list) => {
        const dbOperationList = [];
        list.forEach((each, index) => {
            const { action, ...payload } = each;
            if (each.action === ACTION.CREATE) {
                dbOperationList.push(crypto.create(payload));
            }

            if (each.action === ACTION.UPDATE) {
                const { action, name, code, logo, ...payload } = each;
                dbOperationList.push(crypto.update(each, { where: { code }}));
            }

            each.action = null;
        });

        try {
            await Promise.all(dbOperationList);
        }
        catch (error) {
            console.log(error);
        }
    }


    addNotificationDB = async (list) => {
        const dbOperation = [];

        list.forEach((each, index) => {
            let description = `${each.code} is on the move. The Price is ${each.status === STATUS.HIGH ? 'up' : 'down'} ${each.change} in 24 hrs to ${each.price}`;
            
            const payload = {
                title: each.status === STATUS.HIGH ? 'Price went up' : 'Price went down',
                status: each.status,
                resourceId: each.id,
                description
            };

            dbOperation.push(notification.create(payload));
        });

        try {
            await Promise.all(dbOperation);
        }
        catch (error) {
            console.log(error);
        }
    }

    processForNotification = (crypto) => {
        // check whether data exists in wishlist or not
        // if not exists then do nothing
        // if exists then check the price for min_price and max_price
        // Trigger notification based on it
        console.log(MemoryStorage.wishList);
        console.log(crypto);
        const notificationList = [];
        const obj = MemoryStorage.wishList.find((each) => each.code === crypto.code);
        if (obj) {
            const { code, min_price, max_price } = obj;
            if (crypto.price < min_price) {
                notificationList.push({ id: obj.cryptoId, code, change: crypto.change, price: crypto.price, status: STATUS.LOW });
            }

            if (crypto.price > max_price) {
                notificationList.push({ id: obj.cryptoId, status: STATUS.HIGH });
            }
        }

        this.addNotificationDB(notificationList);
    }

    /**
     * Function to check whether the update happened in the crypto or not
     * This decides whether to update the db or not
     * @param {*} dataItem
     * @param {*} input
     * @memberof DataScrape
     */
    checkChanges = (dataItem, input) => {
        let change = false;

        if (dataItem.price != input.price || dataItem.marketCap != input.marketCap || dataItem.change != input.change) {
            change = true;
            dataItem.price = input.price;
            dataItem.marketCap = input.marketCap;
            dataItem.change = input.change;
        }

        return [change, dataItem];
    }
    
    /**
     * Function to check whether data exists on map or not
     * If exists then update
     * other insert
     * @param {*} data
     * @memberof DataScrape
     */
    processData = (data) => {
        if (MemoryStorage.map.has(data.code)) {
            const dataIndex = MemoryStorage.getItemMap(data.code);
            const dataItem = MemoryStorage.cryptoList[dataIndex];
            const[change, dataChange] = this.checkChanges(dataItem, data);
            if (change) {
                dataItem.action = ACTION.UPDATE;
                this.processForNotification(dataItem);
            }
        }
        else {
            data.action = ACTION.CREATE;
            const addedItemIndex = MemoryStorage.addItemInList(data) - 1;
            MemoryStorage.setItemInMap(data.code, addedItemIndex);
        }
    }

    /**
     * Function to process the html data scrapped from the website
     * Cheerio library is used
     * @param {*} html
     * @memberof DataScrape
     */
    processHtml = (html) => {
        const $ = cheerio.load(html);
        $('tr.table__row').each((index, el) => {
            const data = {};
            const item = cheerio.load(el);
            item('td').each((index, tdele) => {
                const tdItem = cheerio.load(tdele);
                if (index === 0) {
                    data.code = tdItem(this.CURRENCY_SELECTOR.CODE).text().trim();
                    data.name = tdItem(this.CURRENCY_SELECTOR.NAME).text().trim();
                    data.logo = tdItem(this.CURRENCY_SELECTOR.LOGO).attr('src');
                }

                if (index === 1) {
                    data.price = tdItem(this.CURRENCY_SELECTOR.PRICE).text().replace('$', '').replace(/,/g, '').trim();
                }

                if (index === 2) {
                    data.marketCap = tdItem(this.CURRENCY_SELECTOR.PRICE).text().replace('$', '').trim();
                }

                if (index === 3) {
                    data.change = tdItem(this.CURRENCY_SELECTOR.CHANGE).text().trim();
                }
            });

            if (data.code && data.name && data.logo) this.processData(data); // Handling the case of not having any data attributes
        });

        this.insertCryptoListDb(MemoryStorage.cryptoList);
    }

    /**
     * Function to start the data scraping
     * @param {*} url
     * @memberof DataScrape
     */
    scrapeDataRequestPromise = async (url) => {
        const html = await rp(url);
        this.processHtml(html);
    }
}

module.exports = new DataScrape();