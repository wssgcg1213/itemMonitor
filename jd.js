'use strict';
const rp = require('request-promise')
const iconv = require('iconv-lite')
const services = require('./services')
const InstantMessage = services.InstantMessgae

module.exports = ({ skuId, area, cat, pduId }) => {
  const sourceUrl = `https://c0.3.cn/stock?skuId=${skuId}&area=${area}&cat=${cat}&buyNum=1&extraParam={%22originid%22:%221%22}&ch=1&pduid=${pduId}`
  let state = ''

  return () => {
    return rp({
      url: sourceUrl,
      encoding: null
    })
    .then((buf) => iconv.decode(buf, 'GBK'))
    .then((result) => JSON.parse(result))
    .then((obj) => {
      const newState = obj.stock.StockStateName
      if (newState !== state) {
        state = newState
        const msg = new InstantMessage({ message: `商品状态变更为：${newState} JD` })
        msg.send()
      }
      console.log(
        `${new Date()} | ${obj.stock.stockDesc} | JD`
      )
    })
    .catch((err) => {
      console.log('err in jd.js', err.stack)
    })
  }
}
