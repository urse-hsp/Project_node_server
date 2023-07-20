import { Controller } from 'egg';

class NpmController extends Controller {
  async getLogisticsInfo() {
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
    const url = `https://www.kuaidi100.com/autonumber/autoComNum?resultv2=1&text=${ctx.params.id}`;

    // 示例：请求一个 npm 模块信息
    try {
      const result = await ctx.curl(url, {
        // 自动解析 JSON response
        dataType: 'json',
        // 3 秒超时
        timeout: 3000,
      });
      if (result.status !== 200) {
        ctx.service.utils.resextra('获取物流信息失败！');
      }

      // 获取物流信息成功
      ctx.service.utils.resextra(result.data);
    } catch (error) {
      ctx.service.utils.resextra('获取物流信息失败！');
    }
  }
}
module.exports = NpmController;
