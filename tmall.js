'use strict'

const rp = require('request-promise')
const fs = require('fs')
const services = require('./services')
const InstantMessage = services.InstantMessgae

module.exports = ({ itemId }) => {
  const exParams = escape(JSON.stringify({
    test: 'value'
  }))
  const payload = escape(JSON.stringify({
    detail_v: '2.0.2',
    exParams,
    itemNumId: String(itemId) // 526405621894
  }))
  const url = `http://acs.m.taobao.com/gw/mtop.taobao.detail.getdetail/6.0/?data=${JSON.stringify(payload)}`
  let state = ''

  return () => {
    return rp(url)
    .then((raw) => {
      return raw
    })
    .then((raw) => JSON.parse(raw))
    .then((result) => {
      const trade = JSON.parse(result.data.apiStack[0].value).trade
      const title = result.data.item.title
      const newState = trade.hintBanner.text
      console.log(
        `${new Date()} | 可买：${trade.buyEnable} | 可加购物车：${trade.cartEnable} | ${trade.hintBanner.text} | Tmall`
      )
      if (trade.buyEnable !== 'false') {
        const msg = new InstantMessage({ message: `${title} 可以买啦！！！TMALL` })
        msg.send()
      } else if (state !== newState) {
        state = newState
        const msg = new InstantMessage({ message: `${title} 状态变更：${newState} TMALL` })
        msg.send()
      }
    })
  }
}
