'use strict';

import { Service } from 'egg';
import Password from 'node-php-password';
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

    try {
      const manager = await app_.model.ManagerModel.findOne({
        where: {
          mg_name: username,
        },
      });
      if (!manager) {
        return '用户名不存在';
      }

      if (manager.role_id < 0) {
        return '该用户没有权限登录';
      }

      if (manager.role_id !== 0 && manager.mg_state !== 1) {
        return '该用户已经被禁用';
      }
      if (Password.verify(password, manager.mg_pwd)) {
        return {
          id: manager.mg_id,
          rid: manager.role_id,
          username: manager.mg_name,
          mobile: manager.mg_mobile,
          email: manager.mg_email,
        };
      }
      return '密码错误';
    } catch (error) {
      this.app.logger.debug(error);
    }
  }
}

module.exports = ManagerService;
