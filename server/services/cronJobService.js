const cron = require('node-cron');
const { SCHEDULE_TIME, DATA_SCRAPE_URL } = require('./constant');
const DataScrapeService = require('./dataScrapeService');

class CronJobService {
    scheduleInEveryFiveMin = () => {
        cron.schedule(SCHEDULE_TIME.FIVE_MIN, () => {
            console.log(`Running in every five minutes ${new Date().toString()}`);
            DataScrapeService.scrapeDataRequestPromise(DATA_SCRAPE_URL);
        });
    }
}

module.exports = new CronJobService();