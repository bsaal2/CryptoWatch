const MiddlewareService = require('./middlewareService');
const CronJobService = require('./cronJobService')
const DataScrapeService = require('./dataScrapeService');
const MemoryStorage = require('./memoryStorage');

module.exports = {
    MiddlewareService,
    CronJobService,
    DataScrapeService,
    MemoryStorage
};
