// 添加统一的返回结果方法
module.exports = (req, res, next) => {
  res.sendResult = (data = {}, success = true, message = '', code = 200) => {
    var fmt = req.query.fmt ? req.query.fmt : 'rest'
    if (fmt == 'rest') {
      res.json({
        data,
        success,
        msg: message,
        code,
      })
    }
  }
  next()
}
