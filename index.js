const schedule = require('node-schedule');
const task = require('./task')

schedule.scheduleJob('*/5 * * * *', task)