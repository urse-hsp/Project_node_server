import { Controller } from 'egg';

class GoodsController extends Controller {
  // 商品列表
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
    const conditions: any = {
      current: ctx.query.current,
      pageSize: ctx.query.pageSize,
    };
    if (ctx.query.query) {
      conditions.query = ctx.query.query;
    }
    const res = await ctx.service.goodService.getAllGoods(conditions);
    ctx.service.utils.resextra(res);
  }

  // 添加商品
  async create() {
    const ctx = this.ctx;
    const res = await ctx.service.goodService.createGood(ctx.request.body);
    ctx.service.utils.resextra(res);
  }

  // // 更新商品
  // router.put(
  //   '/:id',
  //   // 参数验证
  //   function (req, res, next) {
  //     if (!req.params.id) {
  //       return res.sendResult(null, 400, '商品ID不能为空')
  //     }
  //     if (isNaN(parseInt(req.params.id))) return res.sendResult(null, 400, '商品ID必须是数字')
  //     next()
  //   },
  //   // 业务逻辑
  //   function (req, res, next) {
  //     var params = req.body
  //     goodServ.updateGood(req.params.id, params, function (err, newGood) {
  //       if (err) return res.sendResult(null, 400, err)
  //       res.sendResult(newGood, 200, '创建商品成功')
  //     })
  //   }
  // )

  // // 获取商品详情
  // router.get(
  //   '/:id',
  //   // 参数验证
  //   function (req, res, next) {
  //     if (!req.params.id) {
  //       return res.sendResult(null, 400, '商品ID不能为空')
  //     }
  //     if (isNaN(parseInt(req.params.id))) return res.sendResult(null, 400, '商品ID必须是数字')
  //     next()
  //   },
  //   // 业务逻辑
  //   function (req, res, next) {
  //     goodServ.getGoodById(req.params.id, function (err, good) {
  //       if (err) return res.sendResult(null, 400, err)
  //       return res.sendResult(good, 200, '获取成功')
  //     })
  //   }
  // )

  // 删除商品
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
    const res = await ctx.service.goodService.deleteGood(ctx.params.id);
    ctx.service.utils.resextra(res);
  }

  // 更新商品的图片
  // router.put(
  //   '/:id/pics',
  //   // 参数验证
  //   function (req, res, next) {
  //     if (!req.params.id) {
  //       return res.sendResult(null, 400, '商品ID不能为空')
  //     }
  //     if (isNaN(parseInt(req.params.id))) return res.sendResult(null, 400, '商品ID必须是数字')
  //     next()
  //   },
  //   // 业务逻辑
  //   function (req, res, next) {
  //     goodServ.updateGoodPics(req.params.id, req.body, function (err, good) {
  //       if (err) return res.sendResult(null, 400, err)
  //       res.sendResult(good, 200, '更新成功')
  //     })(req, res, next)
  //   }
  // )

  // 更新商品的属性
  // router.put(
  //   '/:id/attributes',
  //   // 参数验证
  //   function (req, res, next) {
  //     if (!req.params.id) {
  //       return res.sendResult(null, 400, '商品ID不能为空')
  //     }
  //     if (isNaN(parseInt(req.params.id))) return res.sendResult(null, 400, '商品ID必须是数字')
  //     next()
  //   },
  //   // 业务逻辑
  //   function (req, res, next) {
  //     goodServ.updateGoodAttributes(req.params.id, req.body, function (err, good) {
  //       if (err) return res.sendResult(null, 400, err)
  //       res.sendResult(good, 200, '更新成功')
  //     })(req, res, next)
  //   }
  // )

  // 更新商品状态
  // router.put(
  //   '/:id/state/:state',
  //   // 参数验证
  //   function (req, res, next) {
  //     if (!req.params.id) {
  //       return res.sendResult(null, 400, '商品ID不能为空')
  //     }
  //     if (isNaN(parseInt(req.params.id))) return res.sendResult(null, 400, '商品ID必须是数字')
  //     if (!req.params.state) {
  //       return res.sendResult(null, 400, '状态值不能为空')
  //     }
  //     if (req.params.state != 0 && req.params.state != 1 && req.params.state != 2) {
  //       return res.sendResult(null, 400, '状态值只能为 0 ，1 或 2')
  //     }
  //     next()
  //   },
  //   function (req, res, next) {
  //     goodServ.updateGoodsState(req.params.id, req.params.state, function (err, good) {
  //       if (err) return res.sendResult(null, 400, err)
  //       res.sendResult(good, 200, '更新成功')
  //     })(req, res, next)
  //   }
  // )
}

module.exports = GoodsController;
