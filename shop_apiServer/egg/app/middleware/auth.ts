import config from '../../config/default.json';
import jwt from 'jsonwebtoken';
const jwt_config = config.jwt;

// 权限
module.exports = (options, app) => {
  options;
  return async function auth(ctx, next) {
    const istoken_session = true; // 验证方式  cookie/params
    // 拿到不需要验证的token的路由
    const routerAuth = app.config.routerAuth;
    // 获取当前路由
    const url = ctx.url;
    // 判断当前路由是否需要验证token
    const flag = routerAuth.includes(url);

    // TOP2
    if (flag) {
      // 不需要验证
      await next();
    } else {
      // 通过cookie验证
      if (istoken_session) {
        // TPO1 session cookie
        if (ctx?.user && ctx.user.id) {
          await next();
        } else {
          ctx.status = 401;
          ctx.body = 'token失效或解析错误';
        }
        return;
      }
      // 获取token,如果没有传入token，则为空
      const token = ctx.headers.authorization ? ctx.headers.authorization : '';
      token.substring(7); // 把Bearer 截取掉，解析的时候不需要加上Bearer

      // 解析token
      jwt.verify(token, jwt_config.secretKey, function(err) {
        if (err) {
          ctx.status = 401;
          ctx.body = 'token失效或解析错误';
          return;
        }
        // 通过
        next();
      });
    }
  };
};
