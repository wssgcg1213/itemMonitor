const rp = require('request-promise')
const fs = require('fs')
const itemId = 539170681401 // 小米 3S 65
const exParams = escape(JSON.stringify({
  test: 'value'
}))
const payload = escape(JSON.stringify({
  detail_v: '2.0.2',
  exParams,
  itemNumId: String(itemId) // 526405621894
}))
const url = `http://acs.m.taobao.com/gw/mtop.taobao.detail.getdetail/6.0/?data=${JSON.stringify(payload)}`
const messageUrl = 'http://hongyan.cqupt.edu.cn/MagicMessage/api/instantMessage'

const generateMessage = (options) => {
  options = options || {}
  const defaultMsg = {
    "openid": "ouRCyjsp3eo3FJil24fV625V_6no",
    "sender": "Ling's Mtop 详情页监控",
    "message": "小米电视机 3S 65寸 可以买啦！！！"
  }
  return Object.assign({}, defaultMsg, options)
}

module.exports = () => {
  rp(url)
  .then((raw) => {
    return raw
  })
  .then((raw) => JSON.parse(raw))
  .then((result) => {
    const trade = JSON.parse(result.data.apiStack[0].value).trade
    const title = result.data.item.title
    console.log(
      `${new Date()} | 可买：${trade.buyEnable} | 可加购物车：${trade.cartEnable} | ${trade.hintBanner.text}`
    )
    if (trade.buyEnable !== 'false') {
      const msg = generateMessage({
        message: `${title} 可以买啦！！！`
      })
      return rp({
        url: messageUrl,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(msg)
      })
    }
  })
  .catch((err) => {
    // console.log(err)
  })
}
