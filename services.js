'use strict'
const rp = require('request-promise')
const MESSAGE_URL = 'http://hongyan.cqupt.edu.cn/MagicMessage/api/instantMessage'
class InstantMessgae {
  constructor(options) {
    Object.assign(this, options)
  }

  _generateMessage() {
    const defaultMessage = {
      "openid": "ouRCyjsp3eo3FJil24fV625V_6no",
      "sender": "Ling's 详情页监控",
      "message": "小米电视机 3S 65寸 可以买啦！！！"
    }
    return Object.assign({}, defaultMessage, this)
  }

  send() {
    const msg = this._generateMessage()
    return rp({
      url: MESSAGE_URL,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(msg)
    }).catch(() => {})
  }
}

exports.InstantMessgae = InstantMessgae