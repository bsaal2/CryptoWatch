const rp = require('request-promise');
const cheerio = require('cheerio');

const MemoryStorage = require('./memoryStorage');
const { crypto } = require('../models');
const { DATA_SCRAPE_URL, ACTION } = require('./constant');

class DataScrape {

    CURRENCY_SELECTOR = {
        NAME: '.profile__link',
        CODE: '.profile__subtitle',
        LOGO: '.profile__logo',
        PRICE: '.valuta',
        CHANGE: '.change'
    };

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

    processData = (data) => {
        if (MemoryStorage.map.has(data.code)) {
            const dataIndex = MemoryStorage.getItemMap(data.code);
            const dataItem = MemoryStorage.cryptoList[dataIndex];
            const[change, dataChange] = this.checkChanges(dataItem, data);
            if (change) {
                dataItem.action = ACTION.UPDATE;
            }
        }
        else {
            data.action = ACTION.CREATE;
            const addedItemIndex = MemoryStorage.addItemInList(data) - 1;
            MemoryStorage.setItemInMap(data.code, addedItemIndex);
        }
    }

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

    scrapeDataRequestPromise = async (url) => {
        const html = await rp(url);
        this.processHtml(html);
    }
}

module.exports = new DataScrape();