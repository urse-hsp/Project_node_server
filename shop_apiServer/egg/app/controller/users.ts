import { Controller } from 'egg';

class UserController extends Controller {
  // 查询用户列表
  async index() {
    const ctx = this.ctx;
    // 参数验证
    ctx.validate(
      {
        current: { type: 'string', message: 'current 参数错误' },
        pageSize: { type: 'string', message: 'pageSize 参数错误' },
        query: 'string?',
      },
      ctx.query,
    );

    const res = await ctx.service.managerService.getAllManagers(ctx.query);
    ctx.service.utils.resextra('GET', res);
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
    ctx.service.utils.resextra('GET', res);
  }

  async update() {
    const ctx = this.ctx;
    // 参数验证
    ctx.validate(
      {
        id: { type: 'string', message: '用户ID不能为空' },
      },
      ctx.params,
    );

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

    ctx.service.utils.resextra('GET', res);
  }
}

module.exports = UserController;
