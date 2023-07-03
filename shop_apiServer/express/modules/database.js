// var path = require('path')
const config = require('../config/default.json')
const { Sequelize } = require('sequelize')

const mysqlConfig = config.mysql
const sequelize = new Sequelize(mysqlConfig.database, mysqlConfig.user, mysqlConfig.password, {
  dialect: 'mysql' /* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */,
  host: mysqlConfig.host, // 数据库地址
  port: mysqlConfig.port,
  connectTimeout: mysqlConfig.connectTimeout, // 链接超时
  multipleStatements: mysqlConfig.multipleStatements, // 是否允许一个query中包含多条sql语句
  pool: {
    //使用连接池连接，默认为true
    max: 50,
    min: 0,
    idle: 30000,
  },
})

// 测试数据库是否连接成功
const initialize = (req, res, next) => {
  try {
    sequelize.authenticate()
    console.log('Connection has been established successfully.')
    next()
  } catch (error) {
    console.error('连接数据库失败失败 %s', err)
  }
}
// 模型同步 https://www.sequelize.cn/core-concepts/model-basics#%E6%A8%A1%E5%9E%8B%E5%90%8C%E6%AD%A5
// sequelize.sync()
// console.log('所有模型均已成功同步.')

// sequelize
//   .authenticate()
//   .then((res) => {
//     console.log('Connection Success!')
//   })
//   .catch((err) => {
//     console.log('Connection Error')
//   })
exports.sequelize = sequelize
exports.initialize = initialize
