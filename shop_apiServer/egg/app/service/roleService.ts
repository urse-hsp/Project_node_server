'use strict';

import { Service } from 'egg';
import _ from 'lodash';

function getPermissionsResult(permissionKeys, permissionIds) {
  const permissionsResult = {};

  // 处理一级菜单
  for (const idx in permissionIds) {
    if (!permissionIds[idx] || permissionIds[idx] === '') continue;
    const permissionId = parseInt(permissionIds[idx]);
    const permission = permissionKeys[permissionId];
    if (permission && Number(permission.ps_level) === 0) {
      permissionsResult[permission.ps_id] = {
        id: permission.ps_id,
        authName: permission.ps_name,
        path: permission.ps_api_path,
        children: [],
      };
    }
  }

  // 临时存储二级返回结果
  const tmpResult = {};
  // 处理二级菜单
  for (const idx in permissionIds) {
    if (!permissionIds[idx] || permissionIds[idx] === '') continue;
    const permissionId = parseInt(permissionIds[idx]);
    const permission = permissionKeys[permissionId];
    if (permission && Number(permission.ps_level) === 1) {
      const parentPermissionResult = permissionsResult[permission.ps_pid];
      if (parentPermissionResult) {
        tmpResult[permission.ps_id] = {
          id: permission.ps_id,
          authName: permission.ps_name,
          path: permission.ps_api_path,
          children: [],
        };
        parentPermissionResult.children.push(tmpResult[permission.ps_id]);
      }
    }
  }

  // 处理三级菜单
  for (const idx in permissionIds) {
    if (!permissionIds[idx] || permissionIds[idx] === '') continue;
    const permissionId = parseInt(permissionIds[idx]);
    const permission = permissionKeys[permissionId];
    if (permission && Number(permission.ps_level) === 2) {
      const parentPermissionResult = tmpResult[permission.ps_pid];

      if (parentPermissionResult) {
        parentPermissionResult.children.push({
          id: permission.ps_id,
          authName: permission.ps_name,
          path: permission.ps_api_path,
        });
      }
    }
  }
  return permissionsResult;
}
class RoleService extends Service {
  /**
   * 获取所有用户的角色 & 权限
   *
   */
  async getAllRoles() {
    const ctx = this.ctx;
    try {
      const roles = await ctx.service.dao.index.list('RoleModel');
      try {
        const permissions = await ctx.service.dao.permissionAPIDAO.list();
        const permissionKeys = _.keyBy(permissions, 'ps_id');
        const rolesResult: any[] = [];
        for (const idx in roles) {
          const role = roles[idx];
          const permissionIds = role.ps_ids.split(',');
          const roleResult: any = {
            id: role.role_id,
            roleName: role.role_name,
            roleDesc: role.role_desc,
            children: [],
          };
          roleResult.children = _.values(
            getPermissionsResult(permissionKeys, permissionIds),
          );
          rolesResult.push(roleResult);
        }
        return rolesResult;
      } catch (error) {
        return '获取权限数据失败';
      }
    } catch (error) {
      return '获取角色数据失败';
    }
  }
  /**
   * 添加角色
   *
   * @param  {[type]}   params [description]
   */
  async createRole(params) {
    if (!params.roleName) return '角色名称不能为空';
    if (!params.roleDesc) params.roleDesc = '';
    const ctx = this.ctx;
    try {
      const role = await ctx.service.dao.index.create('RoleModel', {
        role_name: params.roleName,
        role_desc: params.roleDesc,
        ps_ids: '',
      });
      console.log(role, 'rolerole');

      return {
        roleId: role.role_id,
        roleName: role.role_name,
        roleDesc: role.role_desc,
      };
    } catch (error) {
      return '创建角色失败';
    }
  }
  // /**
  //  * 通过角色 ID 获取角色详情
  //  *
  //  * @param  {[type]}   id 角色ID
  //  * @param  {Function} cb 回调函数
  //  */
  // module.exports.getRoleById = function (id, cb) {
  //   if (!id) return cb('角色ID不能为空')
  //   if (isNaN(parseInt(id))) return cb('角色ID必须为数字')
  //   dao.findByPk('RoleModel', id, function (err, role) {
  //     if (err) return cb('获取角色详情失败')
  //     cb(null, {
  //       roleId: role.role_id,
  //       roleName: role.role_name,
  //       roleDesc: role.role_desc,
  //       rolePermissionDesc: role.ps_ca,
  //     })
  //   })
  // }
  /**
   * 更新角色信息
   *
   * @param  {[type]}   role 角色对象
   */
  async updateRole(params) {
    if (!params) return '参数不能为空';
    if (!params.id) return '角色ID不能为空1';
    if (isNaN(parseInt(params.id))) return '角色ID必须为数字';

    const updateInfo: any = {};
    if (params.roleName) {
      updateInfo.role_name = params.roleName;
    }
    if (params.roleDesc) {
      updateInfo.role_desc = params.roleDesc;
    }

    try {
      const newRole = await this.ctx.service.dao.index.update(
        'RoleModel',
        params.id,
        updateInfo,
      );
      return {
        roleId: newRole.role_id,
        roleName: newRole.role_name,
        roleDesc: newRole.role_desc,
        rolePermissionDesc: newRole.ps_ca,
      };
    } catch (error) {
      return '更新角色信息失败';
    }
  }
  /**
   * 对角色进行授权
   *
   * @param  {[type]}   rights 以 "," 分割的权限列表
   */
  async updateRoleRight(rid, rights) {
    if (!rid) return '角色ID不能为空';
    if (isNaN(parseInt(rid))) return '角色ID必须为数字';
    // 注意这里需要更新权限描述信息字段
    // 暂时实现
    //
    console.log(123123);

    try {
      const newRole = await this.ctx.service.dao.index.update('RoleModel', rid, {
        ps_ids: rights,
      });
      return {
        roleId: newRole.role_id,
        roleName: newRole.role_name,
      };
    } catch (error) {
      return '更新权限失败';
    }
  }
  // /**
  //  * 删除权限
  //  *
  //  * @param  {[type]}   rid            权限ID
  //  * @param  {[type]}   deletedRightId 删除的权限ID
  //  */
  async deleteRoleRight(rid, deletedRightId) {
    console.log(rid, deletedRightId, 444444444);

    try {
      const role = await this.ctx.service.dao.index.findByPk('RoleModel', rid);
      const ps_ids = role.ps_ids.split(',');
      const new_ps_ids: any[] = [];
      for (const idx in ps_ids) {
        const ps_id = ps_ids[idx];
        if (parseInt(deletedRightId) === parseInt(ps_id)) {
          continue;
        }
        new_ps_ids.push(ps_id);
      }
      const new_ps_ids_string = new_ps_ids.join(',');
      role.ps_ids = new_ps_ids_string;
      try {
        await role.save();
        try {
          const permissions = await this.ctx.service.dao.permissionAPIDAO.list();
          const permissionIds = role.ps_ids.split(',');
          const permissionKeys = _.keyBy(permissions, 'ps_id');
          return _.values(getPermissionsResult(permissionKeys, permissionIds));
        } catch (error) {
          return '获取权限数据失败';
        }
      } catch (error) {
        return '删除权限失败';
      }
    } catch (error) {
      return '获取角色信息失败';
    }
  }
  /**
   * 删除角色
   *
   * @param  {[type]}   id 角色ID
   * @param  {Function} cb 回调函数
   */
  deleteRole(id, cb) {
    if (!id) return cb('角色ID不能为空');
    if (isNaN(parseInt(id))) return cb('角色ID必须为数字');
    const ctx = this.ctx;

    return ctx.service.dao.index.destroy('RoleModel', id);
  }
  // /**
  //  * 权限验证函数
  //  *
  //  * @param  {[type]}   rid         角色ID
  //  * @param  {[type]}   serviceName 服务名
  //  * @param  {[type]}   actionName  动作名（方法）
  //  * @param  {Function} cb          回调函数
  //  */
  // module.exports.authRight = function (rid, serviceName, actionName, cb) {
  //   permissionAPIDAO.authRight(rid, serviceName, actionName, function (err, pass) {
  //     cb(err, pass)
  //   })
  // }
}

module.exports = RoleService;
