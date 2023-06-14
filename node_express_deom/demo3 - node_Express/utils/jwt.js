// 引入模块依赖
const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')
const day_num = 1 // 过期天数

// 创建 token 类
class Jwt {
  constructor(data) {
    this.data = data
  }

  //生成token
  generateToken() {
    let data = this.data
    let created = Math.floor(Date.now() / 1000) + 1000 * 60 * 60 * 24 * day_num // 最后面一位设置过期天数
    let cert = fs.readFileSync(path.join(__dirname, './pem/rsa_private_key.pem')) //私钥 可以自己生成
    let token = jwt.sign({ data, exp: created }, cert, { algorithm: 'RS256' })
    return token
  }

  // 校验token
  verifyToken() {
    let token = this.data
    let cert = fs.readFileSync(path.join(__dirname, './pem/rsa_public_key.pem')) //公钥 可以自己生成
    let res
    try {
      let result = jwt.verify(token, cert, { algorithms: ['RS256'] }) || {}
      let { exp = 0 } = result,
        current = Math.floor(Date.now() / 1000)
      if (current <= exp) {
        res = result.data || {}
      }
    } catch (e) {
      res = 'err'
    }
    return res
  }
}

module.exports = Jwt
