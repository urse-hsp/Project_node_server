/**
 * token验证函数
 *
 * @param  {[type]}   req  请求对象
 * @param  {[type]}   res  响应对象
 * @param  {Function} next 传递事件函数
 */
 module.exports.tokenAuth = function (req, res, next) {
  passport.authenticate('bearer', { session: false }, function (err, tokenData) {
    if (err) return res.sendResult(null, 400, '无效token')
    if (!tokenData) return res.sendResult(null, 400, '无效token')
    req.userInfo = {}
    req.userInfo.uid = tokenData['uid']
    req.userInfo.rid = tokenData['rid']
    next()
  })(req, res, next)
}
