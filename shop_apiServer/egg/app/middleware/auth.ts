import config from '../../config/default.json';
import jwt from 'jsonwebtoken';
const jwt_config = config.jwt;

// 权限
module.exports = (options, app) => {
  options;
  return async function auth(ctx, next) {

    // const istoken_session = true; // 验证方式  cookie/params
    // 拿到不需要验证的token的路由
    const routerAuth = app.config.routerAuth;
    // 获取当前路由
    const url = ctx.url;
    // 判断当前路由是否需要验证token
    const isFlag = routerAuth.includes(url);

    // TOP2
    if (isFlag) {
      // 不需要验证
      await next();
    } else {
      // 获取token,如果没有传入token，则为空
      const token_ = ctx.headers.authorization.replace('Bearer ', '');
      // 解析token
      const res = await jwt.verify(token_, jwt_config.secretKey);
      if (res) {
        console.log('token通过验证');
        await next();
      } else {
        ctx.status = 403;
        ctx.body = {
          error: 'token失效或解析错误',
        };
      }
    }
  };
};
