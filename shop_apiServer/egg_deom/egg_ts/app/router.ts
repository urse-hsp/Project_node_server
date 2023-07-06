'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // console.log(controller, 'controller');

  // router.get('/', controller.home.index);
  router.resources('topics', '/api/v2/topics', controller.topics);
  // router.get('/api/v2/topics', controller.topics.index);
};
