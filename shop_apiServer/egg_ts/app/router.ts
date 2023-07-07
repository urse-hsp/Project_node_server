'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);
  router.resources('topics', '/api/v2/topics', controller.topics);
  router.post('/api/v1/search', controller.search.index); // app/controller/v1/comments.js
};
