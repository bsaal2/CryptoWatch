const express = require('express');
const bodyParser = require('body-parser');
const timeout = require('connect-timeout');
const cors = require('cors');

const crypto = require('./routes/crypto');
const wishlist = require('./routes/wishlist');

const { MiddlewareService, CronJobService, DataScrapeService } = require('./services');
const { API_TIMEOUT } = require('./constant');

const app = express();

/** Middlewares */
app.use(cors());
app.use(timeout(API_TIMEOUT));
app.use(bodyParser.json({ limit: '2mb' }));

app.use(crypto);
app.use(wishlist);

/** Middleware: Route Not Found */
app.get('*', MiddlewareService.unregisteredRoute);

/** Middleware: To handle the application errors  */
app.use(MiddlewareService.errorHandling);

/** Execute the cron job */
CronJobService.scheduleInEveryFiveMin();

/** Test the data scrapping */
// DataScrapeService.scrapeDataRequestPromise('https://coinranking.com/?page=1');

module.exports = app;