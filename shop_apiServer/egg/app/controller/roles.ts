import { Controller } from 'egg';

class rolesController extends Controller {
  // 获取角色列表
  async index() {
    const ctx = this.ctx;
    // 参数验证
    const res = await ctx.service.roleService.getAllRoles(ctx.query);
    ctx.service.utils.resextra(res);
  }
  // 创建角色
  async create() {
    const ctx = this.ctx;
    // 参数验证
    ctx.validate(
      {
        roleName: {
          type: 'string',
          message: '角色名称不能为空',
        },
      },
      ctx.request.body,
    );
    const { roleName, roleDesc } = ctx.request.body;

    const res = await ctx.service.roleService.createRole({
      roleName,
      roleDesc,
    });
    ctx.service.utils.resextra(res);
  }

  // // 获取角色详情
  // // router.get(
  // //   '/:id',
  // //   // 参数验证
  // //   function (req, res, next) {
  // //     if (!req.params.id) return res.sendResult(null, 400, '角色ID不能为空')
  // //     if (isNaN(parseInt(req.params.id))) res.sendResult(null, 400, '角色ID必须为数字')
  // //     next()
  // //   },
  // //   // 处理业务逻辑
  // //   function (req, res, next) {
  // //     roleServ.getRoleById(req.params.id, function (err, result) {
  // //       if (err) return res.sendResult(null, 400, err)
  // //       res.sendResult(result, 200, '获取成功')
  // //     })
  // //   }
  // // )

  // 更新角色信息
  async update() {
    const ctx = this.ctx;
    // 参数验证
    ctx.validate(
      {
        id: {
          type: 'id',
          message: '角色ID不能为空',
        },
      },
      ctx.params,
    );

    if (ctx.request.body?.type === 'rights') {
      return this.rights();
    }

    ctx.validate(
      {
        roleName: {
          type: 'string',
          message: '角色名称不能为空',
        },
      },
      ctx.request.body,
    );

    const params = {
      id: ctx.params.id,
      roleName: ctx.request.body.roleName,
      roleDesc: ctx.request.body.roleDesc,
    };
    const res = await ctx.service.roleService.updateRole(params);
    ctx.service.utils.resextra(res);
  }

  // 删除角色
  async destroy() {
    const ctx = this.ctx;
    // 参数验证
    ctx.validate(
      {
        id: {
          type: 'id', // 直接赋值给rule传过来
        },
      },
      ctx.params,
    );
    console.log(1);

    if (ctx.request.body?.type === 'rights') {
      return this.removeRights();
    }

    const res = await ctx.service.roleService.deleteRole(ctx.params.id);
    ctx.service.utils.resextra(res);
  }

  // 为角色授权
  async rights() {
    const ctx = this.ctx;

    const res = await ctx.service.roleService.updateRoleRight(
      ctx.params.id,
      ctx.request.body.rids,
    );
    ctx.service.utils.resextra(res);
  }

  // 删除角色权限 id 权限,attrId id的父级
  async removeRights() {
    const ctx = this.ctx;

    // 参数验证
    ctx.validate(
      {
        rightId: {
          type: 'rightId',
        },
      },
      ctx.request.body,
    );

    const res = await ctx.service.roleService.deleteRoleRight(
      ctx.params.id,
      ctx.request.body.rightId,
    );
    ctx.service.utils.resextra(res, 'GET');
  }
}

module.exports = rolesController;
