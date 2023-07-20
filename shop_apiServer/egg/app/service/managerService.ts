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

  ManagerModelDom(type: string, nweParams: any) {
    const ctx = this.ctx;
    return ctx.service.dao.index[type]('ManagerModel', nweParams);
  }

  /**
   * 获取所有管理员
   * @param  {[type]}   conditions 查询条件
   */
  async getAllManagers(conditions) {
    const ctx = this.ctx;
    // 通过关键词获取管理员数量

    try {
      const users = await ctx.service.dao.managerDAO.countByKey(conditions.query);
      const count = users[0].count;
      const key = conditions.query;
      const current = parseInt(conditions.current);
      const pageSize = parseInt(conditions.pageSize);

      // const pageCount = Math.ceil(count / pageSize);
      let offset = (current - 1) * pageSize; // 当前页
      if (offset >= count) {
        offset = count;
      }
      const limit = pageSize; // 当前页数量
      try {
        const managers = await ctx.service.dao.managerDAO.findByKey(key, offset, limit);
        const retManagers: any[] = [];
        for (const idx in managers) {
          const manager = managers[idx];
          let role_name = manager.role_name;
          if (!manager.role_id) {
            role_name = '超级管理员';
          }
          const data = {
            id: manager.mg_id,
            role_name,
            username: manager.mg_name,
            create_time: manager.mg_time,
            mobile: manager.mg_mobile,
            email: manager.mg_email,
            mg_state: manager.mg_state === 1,
          };
          retManagers.push(data);
        }
        const resultDta = {
          total: count,
          current,
          data: retManagers,
        };
        return resultDta;
      } catch (error) {
        return '查询失败';
      }
    } catch (error) {
      return error;
    }
  }

  /**
   * 创建管理员
   *
   * @param  {[type]}   user 用户数据集
   */
  async createManager(params) {
    const ctx = this.ctx;
    const res = await ctx.service.dao.index.exists('ManagerModel', {
      where: { mg_name: params.username },
    });

    if (res === false) {
      return '查询失败';
    }
    if (res) {
      return '用户名已存在';
    }

    const nweParams: any = {
      mg_name: params.username,
      mg_pwd: Password.hash(params.password),
      mg_mobile: params.mobile,
      mg_email: params.email,
      mg_time: Date.parse(new Date().toString()) / 1000,
      role_id: params.rid,
    };
    // const newUser = await ctx.service.dao.index.create('ManagerModel', nweParams);
    // const newUser = await ctx.model.ManagerModel.create(nweParams);
    try {
      const newUser = await this.ManagerModelDom('create', nweParams);
      const result = {
        id: newUser.mg_id,
        username: newUser.mg_name,
        mobile: newUser.mg_mobile,
        email: newUser.mg_email,
        role_id: newUser.role_id,
        create_time: newUser.mg_time,
      };
      return result;
    } catch (_error) {
      return '创建失败';
    }
  }

  /**
   * 更新管理员信息
   *
   * @param  {[type]}   params 管理员信息
   */
  async updateManager(params) {
    const mg_params = {
      mg_id: params.id,
      mg_mobile: params.mobile,
      mg_email: params.email,
    };

    try {
      return this.ctx.service.dao.index.update(
        'ManagerModel',
        mg_params.mg_id,
        mg_params,
        'mg_id',
      );
    } catch (error) {
      return '更新失败';
    }
  }

  // /**
  //  * 通过管理员 ID 获取管理员信息
  //  *
  //  * @param  {[type]}   id 管理员 ID
  //  * @param  {Function} cb 回调函数
  //  */
  // module.exports.getManager = function (id, cb) {
  //   managersDAO.show(id, function (err, manager) {
  //     if (err) return cb(err)
  //     if (!manager) return cb('该管理员不存在')
  //     cb(null, {
  //       id: manager.mg_id,
  //       rid: manager.role_id,
  //       username: manager.mg_name,
  //       mobile: manager.mg_mobile,
  //       email: manager.mg_email,
  //     })
  //   })
  // }

  /**
   * 通过管理员 ID 进行删除操作
   *
   * @param  {[type]}   id 管理员ID
   * @param  {Function} cb 回调函数
   */
  async deleteManager(id) {
    try {
      await this.ManagerModelDom('destroy', id);
      return true;
    } catch (error) {
      return '删除失败';
    }
  }

  /**
   * 为管理员设置角色
   *
   * @param {[type]}   id  管理员ID
   * @param {[type]}   rid 角色ID
   */
  async setRole(id, rid) {
    const ctx = this.ctx;
    // 通过ID获取管理员对象数据

    try {
      const manager = await ctx.service.dao.index.show('ManagerModel', id);
      try {
        // 更新管理员信息
        await ctx.service.dao.index.update('ManagerModel', id, {
          role_id: rid,
        });
        return {
          id: manager.mg_id,
          rid: manager.role_id,
          username: manager.mg_name,
          mobile: manager.mg_mobile,
          email: manager.mg_email,
        };
      } catch (error) {
        return '设置失败';
      }
    } catch (error) {
      return '管理员ID不存在';
    }
  }

  // 开关
  async updateMgrState(id, state) {
    const ctx = this.ctx;
    console.log(312);

    try {
      // 通过ID获取管理员对象数据
      const manager = await ctx.service.dao.index.show('ManagerModel', id);
      console.log(manager, '123');

      try {
        // 更新管理员信息
        await ctx.service.dao.index.update('ManagerModel', id, {
          mg_state: state,
        });
        return {
          id: manager.mg_id,
          rid: manager.role_id,
          username: manager.mg_name,
          mobile: manager.mg_mobile,
          email: manager.mg_email,
          mg_state: !!state,
        };
      } catch (error) {
        return '设置失败';
      }
    } catch (error) {
      return '管理员ID不存在';
    }
  }

  // checkSuccess(result) {
  //   if (result.status !== 200) {
  //     const errorMsg =
  //       result.data && result.data.error_msg ? result.data.error_msg : 'unknown error';
  //     this.ctx.throw(result.status, errorMsg);
  //   }
  //   if (!result.data.success) {
  //     this.ctx.throw(500, 'remote response error', { data: result.data });
  //   }
  // }

  /**
   * 管理员登录
   * @param  {[type]}   username 用户名
   * @param  {[type]}   password 密码
   * @param  {Function} cb       回调
   */
  async login(username, password) {
    // const ctx = this.ctx;
    this.app.logger.debug('login => username:%s,password:%s', username, password);
    try {
      const manager = await this.ManagerModelDom('findOne', {
        // const manager = await ctx.model.ManagerModel.findOne({
        // const manager = await ctx.service.dao.index.findOne('ManagerModel', {
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
      return error;
    }
  }
}

module.exports = ManagerService;
