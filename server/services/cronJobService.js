const cron = require('node-cron');
const { SCHEDULE_TIME } = require('./constant');

class CronJobService {
    scheduleInEveryFiveMin = () => {
        cron.schedule(SCHEDULE_TIME.EVERY_SECOND, () => {
            console.log(`Loggin in every minutes ${new Date().toString()}`);
        });
    }
}

module.exports = new CronJobService();