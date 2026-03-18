'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  // 登录
  router.post('/api/private/v1/login', controller.home.login);

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
