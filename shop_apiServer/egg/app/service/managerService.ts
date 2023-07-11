'use strict';

import { Service } from 'egg';
// import Password from 'node-php-password';
// import assert from 'assert';

class ManagerService extends Service {
  root: string;
  constructor(ctx) {
    super(ctx);
    this.root = 'https://cnodejs.org/api/v1';
  }

  /**
   * 管理员登录
   * @param  {[type]}   username 用户名
   * @param  {[type]}   password 密码
   * @param  {Function} cb       回调
   */
  async login(username, password) {
    const app_: any = this.app;
    this.app.logger.debug('login => username:%s,password:%s', username, password);

    const manager = await app_.model.ManagerModel.findAll({ mg_name: username });
    console.log(222);
    // assert(true, 'user.provider should exists');

    // logger.debug(err);
    if (!manager) {
      // return cb('用户名不存在');
      console.log('用户名不存在');
      return;
    }

    if (manager.role_id < 0) {
      console.log('该用户没有权限登录');
      return;
      // return cb('该用户没有权限登录');
    }

    if (manager.role_id !== 0 && manager.mg_state !== 1) {
      console.log('该用户已经被禁用');
      this.ctx.body = '123';
      return;
      // return cb('该用户已经被禁用');
    }
    // if (Password.verify(password, manager.mg_pwd)) {
    //   cb(null, {
    //     id: manager.mg_id,
    //     rid: manager.role_id,
    //     username: manager.mg_name,
    //     mobile: manager.mg_mobile,
    //     email: manager.mg_email,
    //   });
    // } else {
    //   return cb('密码错误');
    // }

    // dao.findOne('ManagerModel', { mg_name: username }, function(err, manager) {
    //   logger.debug(err);
    //   if (err) return cb('用户名不存在');
    //   if (manager.role_id < 0) {
    //     return cb('该用户没有权限登录');
    //   }

    //   if (manager.role_id != 0 && manager.mg_state != 1) {
    //     return cb('该用户已经被禁用');
    //   }

    //   if (Password.verify(password, manager.mg_pwd)) {
    //     cb(null, {
    //       id: manager.mg_id,
    //       rid: manager.role_id,
    //       username: manager.mg_name,
    //       mobile: manager.mg_mobile,
    //       email: manager.mg_email,
    //     });
    //   } else {
    //     return cb('密码错误');
    //   }
    // });
  }
}

module.exports = ManagerService;
