const configs = {
  mysql: {
    host: 'localhost', // 数据库地址
    user: 'root',
    password: '12345',
    port: '3306',
    database: 'login', // 底层数据库
    connectTimeout: 5000, // 链接超时
    multipleStatements: false, // 是否允许一个query中包含多条sql语句
  },
  // 打印错误
  log: {
    error(message) {
      console.log('[knex error]', message)
    },
  },
}

module.exports = configs
