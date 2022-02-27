const cron = require('node-cron');
const { SCHEDULE_TIME } = require('./constant');

class CronJobService {
    scheduleInEveryFiveMin = () => {
        cron.schedule(SCHEDULE_TIME.FIVE_MIN, () => {
            console.log('Loggin in every minutes');
        });
    }
}

module.exports = new CronJobService();