const SCHEDULE_TIME = {
    EVERY_SECOND: '*/1 * * * * *',
    FIVE_MIN: '*/5 * * * *'
};

const ACTION = {
    CREATE: 'create',
    UPDATE: 'update'
};

const DATA_SCRAPE_URL = 'https://coinranking.com/?page=1';

module.exports = {
    SCHEDULE_TIME,
    DATA_SCRAPE_URL,
    ACTION
};
