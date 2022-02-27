const rp = require('request-promise');
const cheerio = require('cheerio');

const { DATA_SCRAPE_URL, ACTION } = require('./constant');

/** In Memory State */
const cryptoList = [];
const map = new Map();

class DataScrape {

    CURRENCY_SELECTOR = {
        NAME: '.profile__link',
        CODE: '.profile__subtitle',
        LOGO: '.profile__logo',
        PRICE: '.valuta',
        CHANGE: '.change'
    };

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
        if (map.has(data.code)) {
            const dataIndex = map.get(data.code);
            const dataItem = cryptoList[dataIndex];
            const[change, dataChange] = this.checkChanges(dataItem, data);
            if (change) {
                data.action = ACTION.UPDATE;
            }
        }
        else {
            data.action = ACTION.CREATE;
            const addedItemIndex = cryptoList.push(data) - 1;
            map.set(data.code, addedItemIndex);
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
                    data.price = tdItem(this.CURRENCY_SELECTOR.PRICE).text().replace('$', '').trim();
                }

                if (index === 2) {
                    data.marketCap = tdItem(this.CURRENCY_SELECTOR.PRICE).text().replace('$', '').trim();
                }

                if (index === 3) {
                    data.change = tdItem(this.CURRENCY_SELECTOR.CHANGE).text().trim();
                }
            });

            this.processData(data);
        });

        console.log('Map', map);
        console.log('FinalList', cryptoList);
    }

    scrapeDataRequestPromise = async (url) => {
        const html = await rp(url);
        this.processHtml(html);
    }
}

module.exports = new DataScrape();