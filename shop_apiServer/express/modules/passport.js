// 验证模块
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const BearerStrategy = require('passport-http-bearer').Strategy
const managerService = require('../services/ManagerService')

const config = require('../config/default.json')
const jwt = require('jsonwebtoken')
const jwt_config = config.jwt

// 通过登录函数初始化
/**
 * 初始化 passport 框架
 *
 * @param  {[type]}   app       全局应用程序
 * @param  {[type]}   loginFunc 登录函数
 * @param  {Function} callback  回调函数
 */
module.exports.setup = function (app, callback) {
  // 用户名密码 登录策略
  passport.use(
    new LocalStrategy(function (username, password, done) {
      console.log('111')
      managerService.login(username, password, function (err, user) {
        if (err) return done(err)
        return done(null, user)
      })
    })
  )

  // token 验证策略 verify校验token
  passport.use(
    new BearerStrategy(function (token, done) {
      console.log('222')
      jwt.verify(token, jwt_config.secretKey, function (err, decode) {
        if (err) {
          return done('验证错误')
        }
        // 通过
        return done(null, decode)
      })
    })
  )

  // 初始化passport模块
  app.use(passport.initialize())
  if (callback) callback()
}

/**
 * 登录验证逻辑 登录接口
 *
 * @param  {[type]}   req  请求
 * @param  {[type]}   res  响应
 * @param  {Function} next [description]
 */
module.exports.login = function (req, res, next) {
  console.log('3333')
  passport.authenticate('local', function (err, user, info) {
    if (err) return res.sendResult(null, 401, err)
    if (!user) return res.sendResult(null, 401, '参数错误')
    let created = Math.floor(Date.now() / 1000) + 1000 * 60 * 60 * 24 * jwt_config.day // 最后面一位设置过期天数

    // 生成token: sign(生成token信息, 加密的key密钥, 时效)
    var token = jwt.sign({ uid: user.id, rid: user.rid }, jwt_config.secretKey, { expiresIn: created })
    user.token = 'Bearer ' + token
    return res.sendResult(user, 200, '登录成功')
  })(req, res, next)
}

/**
 * token验证函数 权限
 *
 * @param  {[type]}   req  请求对象
 * @param  {[type]}   res  响应对象
 * @param  {Function} next 传递事件函数
 */
module.exports.tokenAuth = function (req, res, next) {
  console.log('4444')
  // 这里通过初始化的 Strategy 解析校验后 进行回调处理
  passport.authenticate('bearer', { session: false }, function (err, tokenData) {
    if (err) return res.sendResult(null, 400, '无效token')
    if (!tokenData) return res.sendResult(null, 400, '无效token')
    req.userInfo = {
      uid: tokenData['uid'],
      rid: tokenData['rid'],
    }
    next()
  })(req, res, next)
}
