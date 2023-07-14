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
    // if (!ctx.query.current || ctx.query.current <= 0) return res.sendResult(null, 400, 'current 参数错误');
    // if (!ctx.query.pageSize || ctx.query.pageSize <= 0) return res.sendResult(null, 400, 'pageSize 参数错误');
    // const query = {
    //   current: toInt(ctx.query.current),
    //   pageSize: toInt(ctx.query.pageSize),
    // };

    const res = await ctx.service.managerService.getAllManagers(ctx.query);
    console.log(res, 777);
    ctx.service.utils.resextra('GET', res);
  }
}

module.exports = UserController;
