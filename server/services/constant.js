const SCHEDULE_TIME = {
    EVERY_MINUTE: '*/1 * * * *',
    FIVE_MIN: '*/5 * * * *'
};

const ACTION = {
    CREATE: 'create',
    UPDATE: 'update'
};

const STATUS = {
    HIGH: 'high',
    LOW: 'low'
};

const DATA_SCRAPE_URL = 'https://coinranking.com/?page=1';

module.exports = {
    SCHEDULE_TIME,
    DATA_SCRAPE_URL,
    ACTION,
    STATUS
};
