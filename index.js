const schedule = require('node-schedule');
const tmall = require('./tmall')
const jd = require('./jd')

const tmallTask = tmall({
  itemId: 539170681401
}) // 小米 3S 65
schedule.scheduleJob('*/5 * * * *', tmallTask)

const jdTask = jd({
  skuId: 3323065,
  area: '15_1298_42565_51623',
  cat: '737,794,798',
  pduId: 1344024150
}) // 小米 3S 65

schedule.scheduleJob('*/5 * * * *', jdTask)

tmallTask()
jdTask()
