// 验证模块
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
// import { Strategy } from 'passport-http-bearer';
import jwt from 'jsonwebtoken';
import config from '../../config/default.json';
import assert from 'assert';

// const managerService = require('../services/ManagerService');

const jwt_config = config.jwt;

// 通过登录函数初始化
/**
 * 初始化 passport 框架
 *
 * @param  {[type]}   app       全局应用程序
 * @param  {[type]}   loginFunc 登录函数
 * @param  {Function} callback  回调函数
 */
export const setup = function(app) {
  // 用户名密码 登录策略
  // 挂载 strategy
  app.passport.use(
    new LocalStrategy(
      {
        passReqToCallback: true,
      },
      (req, username, password, done) => {
        console.log('本地验证策略');
        // format user
        const user = {
          provider: 'local',
          username,
          password,
        };
        app.logger.debug('%s %s get user: %j', req.method, req.url, user);
        app.passport.doVerify(req, user, done);
      },
    ),
  );
  // passport.use(
  //   new LocalStrategy(function(username, password, done) {
  //     managerService.login(username, password, function(err, user) {
  //       if (err) return done(err);
  //       return done(null, user);
  //     });
  //   }),
  // );

  // 检查用户
  app.passport.verify(async (ctx, user) => {
    console.log('检查用户');

    assert(user.provider, 'user.provider should exists');
    // assert(user.id, 'user.id should exists');

    // // 从数据库中查找用户信息
    // //
    // // Authorization Table
    // // column   | desc
    // // ---      | --
    // // provider | provider name, like github, twitter, facebook, weibo and so on
    // // uid      | provider unique id
    // // user_id  | current application user id
    await ctx.service.managerService.login(user.username, user.password);
    ctx.body = '312';
    // // 调用 service 注册新用户
    // const newUser = await ctx.service.user.register(user);
    // return 1;
  });

  // token 验证策略 verify校验token
  // passport.use(
  //   new Strategy(function(token, done) {
  //     jwt.verify(token, jwt_config.secretKey, function(err, decode) {
  //       if (err) {
  //         return done('验证错误');
  //       }
  //       // 通过
  //       return done(null, decode);
  //     });
  //   }),
  // );

  // 初始化passport模块
  // app.use(passport.initialize());
  // if (callback) callback();

  // 将用户信息序列化后存进 session 里面，一般需要精简，只保存个别字段
  // app.passport.serializeUser(async () => {
  //   console.log('序列化');

  //   // ctx, user
  //   // 处理 user
  //   // ...
  //   // return user;
  // });

  // // 反序列化后把用户信息从 session 中取出来，反查数据库拿到完整信息
  // app.passport.deserializeUser(async () => {
  //   console.log('反序列化');

  //   // ctx, user
  //   // 处理 user
  //   // ...
  //   // return user;
  // });
  // 将用户信息序列化后存进 session 里面，一般需要精简，只保存个别字段
  // app.passport.serializeUser(async () => {
  //   console.log('序列化');

  //   // ctx, user
  //   // 处理 user
  //   // ...
  //   // return user;
  // });

  // // 反序列化后把用户信息从 session 中取出来，反查数据库拿到完整信息
  // app.passport.deserializeUser(async () => {
  //   console.log('反序列化');

  //   // ctx, user
  //   // 处理 user
  //   // ...
  //   // return user;
  // });
};

/**
 * 登录验证逻辑 登录接口
 *
 * @param  {[type]}   req  请求
 * @param  {[type]}   res  响应
 * @param  {Function} next [description]
 */
module.exports.login = function(req, res, next) {
  passport.authenticate('local', function(err, user) {
    // , info
    if (err) return res.sendResult(null, 401, err);
    if (!user) return res.sendResult(null, 401, '参数错误');
    const created = Math.floor(Date.now() / 1000) + 1000 * 60 * 60 * 24 * jwt_config.day; // 最后面一位设置过期天数

    // 生成token: sign(生成token信息, 加密的key密钥, 时效)
    const token = jwt.sign({ uid: user.id, rid: user.rid }, jwt_config.secretKey, {
      expiresIn: created,
    });
    user.token = 'Bearer ' + token;
    return res.sendResult(user, 200, '登录成功');
  })(req, res, next);
};

/**
 * token验证函数 权限
 *
 * @param  {[type]}   req  请求对象
 * @param  {[type]}   res  响应对象
 * @param  {Function} next 传递事件函数
 */
module.exports.tokenAuth = function(req, res, next) {
  // 这里通过初始化的 Strategy 解析校验后 进行回调处理
  passport.authenticate('bearer', { session: false }, function(err, tokenData) {
    if (err) return res.sendResult(null, 400, '无效token');
    if (!tokenData) return res.sendResult(null, 400, '无效token');
    req.userInfo = {
      uid: tokenData.uid,
      rid: tokenData.rid,
    };
    next();
  })(req, res, next);
};
