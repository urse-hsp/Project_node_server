// 引用配置文件
const configs = require('../config')
// 把配置文件中的信息，设置在初始化配置中
module.exports = require('knex')({
  client: 'mysql',
  connection: configs.mysql,
  // 打印错误
  log: {
    error(message) {
      console.log('[knex error]', message)
    },
  },
})
