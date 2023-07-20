import { Controller } from 'egg';

class OrdersController extends Controller {
  // 订单列表
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
    if (ctx.query.user_id) {
      conditions.user_id = ctx.query.user_id;
    }
    if (ctx.query.pay_status) {
      conditions.pay_status = ctx.query.pay_status;
    }
    if (ctx.query.is_send) {
      conditions.is_send = ctx.query.is_send;
    }
    if (ctx.query.order_fapiao_title) {
      conditions.order_fapiao_title = ctx.query.order_fapiao_title;
    }
    if (ctx.query.order_fapiao_company) {
      conditions.order_fapiao_company = ctx.query.order_fapiao_company;
    }
    if (ctx.query.order_fapiao_content) {
      conditions.order_fapiao_content = ctx.query.order_fapiao_content;
    }
    if (ctx.query.consignee_addr) {
      conditions.consignee_addr = ctx.query.consignee_addr;
    }
    const res = await ctx.service.orderService.getAllOrders(conditions);
    ctx.service.utils.resextra(res);
  }

  // // 添加订单
  // router.post(
  //   '/',
  //   // 参数验证
  //   function (req, res, next) {
  //     next()
  //   },
  //   // 业务逻辑
  //   function (req, res, next) {
  //     var params = req.body
  //     orderServ.createOrder(params, function (err, newOrder) {
  //       if (err) return res.sendResult(null, 400, err)
  //       return res.sendResult(newOrder, 201, '创建订单成功')
  //     })(req, res, next)
  //   }
  // )

  // // 更新订单发送状态

  async update() {
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
    const params = ctx.request.body;
    const res = await ctx.service.orderService.updateOrder(ctx.params.id, params);
    ctx.service.utils.resextra(res);
  }

  // router.get('/:id', function (req, res, next) {
  //   orderServ.getOrder(req.params.id, function (err, result) {
  //     if (err) return res.sendResult(null, 400, err)
  //     return res.sendResult(result, 200, '获取成功')
  //   })(req, res, next)
  // })
}

module.exports = OrdersController;
