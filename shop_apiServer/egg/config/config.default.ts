import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import databaseres from '../database/config.json';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1688979477290_8216';

  // add your egg config in here // 执行顺序 --->
  config.middleware = [ 'auth', 'errorHandler' ];

  // 配置 resextra 中间件的配置
  config.errorHandler = { match: '/' };
  config.auth = { match: '/api' }; // /api接口 生效验证

  // 不需要验证token的路由
  config.routerAuth = [ '/api/private/v1/login' ];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  config.sequelize = databaseres.development;

  // https://github.com/eggjs/egg-security
  // 报错的原因 Egg 启动的是本地地址 http://127.0.0.1:7001 ，但是你请求的 POST 或 GET 接口是非本地计算机（别人的电脑），或者使用 Postman 发起请求，都会触发安防策略。
  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [ '*' ], // 配置白名单
  };
  config.cors = {
    origin: '*', // 允许所有的请求源
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    credentials: true, // 允许携带跨域请求的 cookie
  };

  // config.proxy = true;

  config.session = {
    key: 'SESSION_ID', // 修改为你自己的会话键名
    maxAge: 1 * 24 * 3600 * 1000, // 会话过期时间，这里设置为 1 天
    // maxAge: 1000 * 60, // 1分钟
    httpOnly: true,
    encrypt: true,
    renew: true, // 每次访问都会刷新会话过期时间
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
    // customLoader: {
    //   // 定义在 app 上的属性名 app.adapter
    //   dao: {
    //     // 相对于 app.config.baseDir
    //     directory: 'app/dao',
    //     // 如果是 ctx 则使用 loadToContext
    //     // inject: 'app',
    //     // // 是否加载框架和插件的目录
    //     // loadunit: false,
    //     // // 还可以定义其他 LoaderOptions
    //   },
    // },
  };
};
