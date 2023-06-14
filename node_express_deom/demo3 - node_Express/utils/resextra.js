// 添加统一的返回结果方法
module.exports = (req, res, next) => {
  res.sendResult = (data = {}, message = '', success = true, code = 200, params = {}) => {
    var fmt = req.query.fmt ? req.query.fmt : 'rest'
    if (fmt == 'rest') {
      res.json({
        success,
        code,
        msg: message,
        data,
        ...params,
      })
    }
  }
  next()
}
