import { Controller } from 'egg';

// function toInt(str) {
//   if (typeof str === 'number') return str;
//   if (!str) return str;
//   return parseInt(str, 10) || 0;
// }

class UserController extends Controller {
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
      params.rid = -1; // return res.sendResult(null,200,"角色ID必须是数字");
    }
    const res = await ctx.service.managerService.createManager(params);
    ctx.service.utils.resextra('GET', res);
  }
}

module.exports = UserController;
