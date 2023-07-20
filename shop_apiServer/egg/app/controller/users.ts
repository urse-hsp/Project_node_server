import { Controller } from 'egg';

class UserController extends Controller {
  // 查询用户列表
  async index() {
    const ctx = this.ctx;
    // 参数验证
    ctx.validate(
      {
        current: { type: 'current' },
        pageSize: { type: 'pageSize' },
        query: 'string?',
      },
      ctx.query,
    );

    const res = await ctx.service.managerService.getAllManagers(ctx.query);
    ctx.service.utils.resextra(res);
  }

  // 创建用户
  async create() {
    const ctx = this.ctx;
    // 参数验证
    ctx.validate(
      {
        username: { type: 'string', message: '用户名不能为空' },
        password: { type: 'string', message: '密码不能为空' },
        email: { type: 'string', message: 'email不能为空' },
        mobile: { type: 'string', message: '手机号不能为空' },
      },
      ctx.request.body,
    );
    const params = ctx.request.body;
    if (!params?.rid) {
      params.rid = -1;
    }
    if (isNaN(parseInt(params?.rid))) {
      params.rid = -1; // 角色ID必须是数字
    }
    const res = await ctx.service.managerService.createManager(params);
    ctx.service.utils.resextra(res);
  }

  // 修改用户信息
  async update() {
    const ctx = this.ctx;
    // 参数验证
    ctx.validate(
      {
        id: {
          type: 'id', // 直接赋值给rule传过来
          // isAdmin: true, // isAdmin管理员用户名不能有中文啊，长度至少5位啊啥的
        },
      },
      ctx.params,
    );
    if (ctx.request.body?.type === 'role') {
      return this.role();
    } else if (ctx.request.body?.type === 'state') {
      return this.state();
    }

    // 参数验证
    ctx.validate(
      {
        mobile: { type: 'string', message: 'mobile不能为空' },
        email: { type: 'string', message: 'email不能为空' },
      },
      ctx.request.body,
    );
    const params = {
      id: Number(ctx.params.id),
      mobile: ctx.request.body.mobile,
      email: ctx.request.body.email,
    };
    const res = await ctx.service.managerService.updateManager(params);
    ctx.service.utils.resextra(res);
  }

  // 删除用户
  async destroy() {
    const ctx = this.ctx;
    // 参数验证
    ctx.validate(
      {
        id: {
          type: 'managerId', // 直接赋值给rule传过来
          isAdmin: true, // isAdmin管理员用户名不能有中文啊，长度至少5位啊啥的
        },
      },
      ctx.params,
    );
    if (Number(ctx.params.id) === 500) {
      console.warn('不允许删除admin账户');
      return '不允许删除admin账户';
    }
    const res = await ctx.service.managerService.deleteManager(ctx.params.id);
    ctx.service.utils.resextra(res);
  }

  // 状态开关
  async state() {
    const ctx = this.ctx;
    // 参数验证
    ctx.validate(
      {
        state: {
          type: 'boolean', // 直接赋值给rule传过来
          message: '状态不能为空',
        },
      },
      ctx.request.body,
    );

    const res = await ctx.service.managerService.updateMgrState(
      ctx.params.id,
      ctx.request.body.state ? 1 : 0,
    );
    ctx.service.utils.resextra(res);
  }

  //   // 获取用户信息
  // router.get(
  //   '/:id',
  //   // 参数验证
  //   function (req, res, next) {
  //     if (!req.params.id) {
  //       return res.sendResult(null, 400, '用户ID不能为空')
  //     }
  //     if (isNaN(parseInt(req.params.id))) return res.sendResult(null, 400, '用户ID必须是数字')
  //     next()
  //   },
  //   function (req, res, next) {
  //     ManagerService.getManager(req.params.id, function (err, manager) {
  //       if (err) return res.sendResult(null, 400, err)
  //       res.sendResult(manager, 200, '获取成功')
  //     })
  //   }
  // )

  // 分配用户角色
  async role() {
    const ctx = this.ctx;
    // 参数验证
    ctx.validate(
      {
        rid: {
          type: 'number', // 直接赋值给rule传过来
          message: '权限ID不能为空',
        },
      },
      ctx.request.body,
    );

    const res = await ctx.service.managerService.setRole(
      ctx.params.id,
      ctx.request.body.rid,
    );
    ctx.service.utils.resextra(res);
  }
}

module.exports = UserController;
