'use strict';

import { Service } from 'egg';
import _ from 'lodash';

class RightService extends Service {
  // // 获取所有权限
  async getAllRights(type) {
    if (!type || (type !== 'list' && type !== 'tree')) {
      return '参数类型错误';
    }
    const ctx = this.ctx;

    try {
      const permissions = await ctx.service.dao.permissionAPIDAO.list();
      if (type === 'list') {
        const result: any[] = [];
        for (const idx in permissions) {
          const permission = permissions[idx];
          result.push({
            id: permission.ps_id,
            authName: permission.ps_name,
            level: permission.ps_level,
            pid: permission.ps_pid,
            path: permission.ps_api_path,
          });
        }
        return result;
      }

      const keyCategories = _.keyBy(permissions, 'ps_id');


      // 显示一级
      const permissionsResult = {};

      // 处理一级菜单
      for (const idx in permissions) {
        const permission = permissions[idx];
        if (permission && Number(permission.ps_level) === 0) {
          permissionsResult[permission.ps_id] = {
            id: permission.ps_id,
            authName: permission.ps_name,
            path: permission.ps_api_path,
            pid: permission.ps_pid,
            children: [],
          };
        }
      }

      // 临时存储二级返回结果
      const tmpResult = {};
      // 处理二级菜单
      for (const idx in permissions) {
        const permission = permissions[idx];
        if (permission && Number(permission.ps_level) === 1) {
          const parentPermissionResult = permissionsResult[permission.ps_pid];
          if (parentPermissionResult) {
            tmpResult[permission.ps_id] = {
              id: permission.ps_id,
              authName: permission.ps_name,
              path: permission.ps_api_path,
              pid: permission.ps_pid,
              children: [],
            };
            parentPermissionResult.children.push(tmpResult[permission.ps_id]);
          }
        }
      }

      // 处理三级菜单
      for (const idx in permissions) {
        const permission = permissions[idx];
        if (permission && Number(permission.ps_level) === 2) {
          const parentPermissionResult = tmpResult[permission.ps_pid];

          if (parentPermissionResult) {
            parentPermissionResult.children.push({
              id: permission.ps_id,
              authName: permission.ps_name,
              path: permission.ps_api_path,
              pid: permission.ps_pid + ',' + keyCategories[permission.ps_pid].ps_pid,
            });
          }
        }
      }

      return _.values(permissionsResult);
    } catch (error) {
      return '获取权限数据失败';
    }
  }
}

module.exports = RightService;
