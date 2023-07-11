'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 挂载鉴权路由
  app.passport.mount('github');

  // 渲染登录页面，用户输入账号密码
  router.get('/api/private/v1/login', controller.home.login);
  // 登录校验
  router.post(
    '/api/private/v1/login',
    app.passport.authenticate('local', { successRedirect: '/authCallback' }),
  );

  // router.get('/', controller.home.index);
  // router.resources('topics', '/api/v2/topics', controller.topics);
  // router.post('/api/v1/search', controller.search.index); // app/controller/v1/comments.js
  // router.resources('users', '/users', controller.users);
};
