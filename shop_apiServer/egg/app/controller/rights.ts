import { Controller } from 'egg';

class rightsController extends Controller {
  // 获取角色列表
  async index() {
    const ctx = this.ctx;
    // 参数验证
    ctx.validate(
      {
        type: { type: 'enum', values: [ 'list', 'tree' ], message: '参数类型错误' },
      },
      ctx.query,
    );
    const res = await ctx.service.rightService.getAllRights(ctx.query.type);
    ctx.service.utils.resextra(res);
  }
}
export default rightsController;
