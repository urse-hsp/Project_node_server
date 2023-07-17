'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  // 鉴权成功后的回调页面
  router.get('/api/private/v1/login', controller.home.authCallback);
  // 登录校验
  router.post(
    '/api/private/v1/login',
    app.passport.authenticate('local', {
      successRedirect: '/api/private/v1/login',
    }),
  );

  router.resources('users', '/api/private/v1/users', controller.users);
  router.put('/api/private/v1/users/:id/state/:state', controller.home.authCallback);

  router.resources('roles', '/api/private/v1/roles', controller.roles);
};
