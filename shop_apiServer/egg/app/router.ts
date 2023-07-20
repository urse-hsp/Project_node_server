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
  router.resources('roles', '/api/private/v1/roles', controller.roles);
  router.resources('rights', '/api/private/v1/rights', controller.rights);
  router.resources('goods', '/api/private/v1/goods', controller.goods);

  router.resources('categories', '/api/private/v1/categories', controller.categories);
  router.get(
    '/api/private/v1/categories/:id/attributes',
    controller.categories.getAttributes,
  );
  router.post(
    '/api/private/v1/categories/:id/attributes',
    controller.categories.createAttributes,
  );
  router.put(
    '/api/private/v1/categories/:id/attributes/:attrId',
    controller.categories.createAttributes,
  );
  router.delete(
    '/api/private/v1/categories/:id/attributes/:attrId',
    controller.categories.deleteAttributes,
  );

  router.resources('orders', '/api/private/v1/orders', controller.orders);
  router.post('/api/private/v1/upload', controller.upload.index);
  router.get('/api/private/v1/kuaidi/:id', controller.npm.getLogisticsInfo);
};
