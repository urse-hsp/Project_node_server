// 验证模块
import { Strategy as LocalStrategy } from 'passport-local';
import jwt from 'jsonwebtoken';
import config from '../../config/default.json';
const jwt_config = config.jwt;

// import assert from 'assert';

/**
 * 登录验证逻辑 登录接口
 *
 * @param  {[type]}   req  请求
 * @param  {[type]}   res  响应
 * @param  {Function} next [description]
 */
export const login = function(user) {
  // if (err) return res.sendResult(null, 401, err);
  if (user.id) {
    const created = Math.floor(Date.now() / 1000) + 1000 * 60 * 60 * 24 * jwt_config.day; // 最后面一位设置过期天数
    // 生成token: sign(生成token信息, 加密的key密钥, 时效)
    const token = jwt.sign({ uid: user.id, rid: user.rid }, jwt_config.secretKey, {
      expiresIn: created,
    });
    user.token = 'Bearer ' + token;
  }
  return user;
};

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
        // 将请求信息传递到callback界面
        passReqToCallback: true,
        // 中间件会自动从username和passport字段读取用户名和密码，如果需要更改：
        // usernameField: 'email',
        // passwordField: 'passwd'
      },
      async (req: any, username, password, done) => {
        // format user
        const user = {
          provider: 'local',
          username,
          password,
        };
        console.log('本地验证策略', user);

        app.logger.debug('%s %s get user: %j', req.method, req.url, user);
        app.passport.doVerify(req, user, done); // 触发我们添加的验证规则
      },
    ),
  );

  // 检查用户
  app.passport.verify(async (ctx, user) => {
    const existsUser = await ctx.service.managerService.login(
      user.username,
      user.password,
    );
    // assert(existsUser.uid, existsUser);
    return existsUser;
  });

  // 存储：将用户信息序列化后存进 session 里面，一般需要精简，只保存个别字段
  app.passport.serializeUser(async (ctx, user) => {
    console.log('序列化', ctx.originalUrl);
    // const userInfo = {
    //   uid: user.uid,
    //   rid: user.rid,
    // };
    return user;
  });

  // 取出：反序列化后把用户信息从 session 中取出来，反查数据库拿到完整信息
  app.passport.deserializeUser(async (ctx, user) => {
    console.log('反序列化', ctx.originalUrl);
    return user;
  });
};

/**
 * token验证函数 权限
 *
 * @param  {[type]}   req  请求对象
 * @param  {[type]}   res  响应对象
 * @param  {Function} next 传递事件函数
 */
// module.exports.tokenAuth = function(req, res, next) {
//   // 这里通过初始化的 Strategy 解析校验后 进行回调处理
//   passport.authenticate('bearer', { session: false }, function(err, tokenData) {
//     if (err) return res.sendResult(null, 400, '无效token');
//     if (!tokenData) return res.sendResult(null, 400, '无效token');
//     req.userInfo = {
//       uid: tokenData.uid,
//       rid: tokenData.rid,
//     };
//     next();
//   })(req, res, next);
// };
