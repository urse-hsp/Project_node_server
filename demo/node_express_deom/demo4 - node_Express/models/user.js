// 用户模型
const Base = require('./base')

class User extends Base {
  // 定义参数默认值为 user 表
  constructor(props = 'students') {
    super(props)
  }
}

module.exports = new User()
