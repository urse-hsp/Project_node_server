import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1688522818608_2198';

  // add your egg config in here
  // 加载 errorHandler 中间件 已内置404
  config.middleware = [ 'errorHandler' ];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // https://github.com/eggjs/egg-security
  // 报错的原因 Egg 启动的是本地地址 http://127.0.0.1:7001 ，但是你请求的 POST 或 GET 接口是非本地计算机（别人的电脑），或者使用 Postman 发起请求，都会触发安防策略。
  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [ '*' ], // 配置白名单
  };

  // config.sequelize = {};

  // the return config will combines to EggAppConfig

  return {
    ...config,
    ...bizConfig,

    // 只对 /api 前缀的 url 路径生效
    errorHandler: {
      match: '/',
    },
    // // 自定义统一异常处理
    // onerror: {
    //   all(_err: any, ctx: { body: string; status: number; }) {
    //     // 在此处定义针对所有响应类型的错误处理方法
    //     // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
    //     ctx.body = 'error';
    //     ctx.status = 500;
    //   },
    //   html(_err: any, ctx: { body: string; status: number; }) {
    //     // html hander
    //     ctx.body = '<h3>error</h3>';
    //     ctx.status = 500;
    //   },
    //   json(_err: any, ctx: { body: { message: string; }; status: number; }) {
    //     // json hander
    //     ctx.body = { message: 'error' };
    //     ctx.status = 500;
    //   },
    //   jsonp() {
    //     // 一般来说，不需要特殊针对 jsonp 进行错误定义，jsonp 的错误处理会自动调用 json 错误处理，并包装成 jsonp 的响应格式
    //   },
    // },
  };
};
