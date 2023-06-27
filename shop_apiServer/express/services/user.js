var path = require('path')
var dao = require(path.join(process.cwd(), 'dao/DAO'))

module.exports.create = function (info, cb) {
  dao.create('User', info, function (err, attribute) {
    console.log(7);
    if (err) cb('创建失败')
    cb(null, attribute)
  })
}
