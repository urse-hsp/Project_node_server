const passport = require('passport')
var jwt = require('jsonwebtoken')

/**
 * 登录验证逻辑
 *
 * @param  {[type]}   req  请求
 * @param  {[type]}   res  响应
 * @param  {Function} next [description]
 */
module.exports.login = function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) return res.sendResult(null, 400, err)
    if (!user) return res.sendResult(null, 400, '参数错误')
    // 获取角色信息
    var token = jwt.sign({ uid: user.id, rid: user.rid }, jwt_config.get('secretKey'), { expiresIn: jwt_config.get('expiresIn') })
    user.token = 'Bearer ' + token
    return res.sendResult(user, 200, '登录成功')
  })(req, res, next)
}
