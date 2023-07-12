import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import databaseres from '../database/config.json';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1688979477290_8216';

  // add your egg config in here
  config.middleware = [ 'errorHandler' ];

  // 配置 resextra 中间件的配置
  config.errorHandler = { match: '/' };

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

  // config/default.js 标准化了配置字段，统一为 key 和 secret 。
  config.passportGithub = {
    key: 'your_clientID',
    secret: 'your_clientSecret',
    // callbackURL: '/passport/github/callback',
    // proxy: false,
  };

  // 3.配置插件的功能，配置插件的功能必须写在声明的config对象下方，是const声明的在声明前操作会报错
  // config/config.default.js文件
  // config.cors = {
  //   // 允许跨域的网址，*表示所有网址都可以跨域请求文件资源，也可以指定域名
  //   origin: '*',
  //   allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  // };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
