'use strict';

import { Service } from 'egg';
import uniqid from 'uniqid';
import _ from 'lodash';
import Sequelize from 'sequelize';
const Op = Sequelize.Op;

class orderService extends Service {
  doCheckOrderParams(params) {
    return new Promise(function(resolve, reject) {
      const info: any = {};
      if (params.order_id) info.order_id = params.order_id;

      if (!params.order_id) {
        if (!params.user_id) return reject('用户ID不能为空');
        if (isNaN(parseInt(params.user_id))) return reject('用户ID必须是数字');
        info.user_id = params.user_id;
      }

      if (!params.order_id) info.order_number = 'itcast-' + uniqid();

      if (!params.order_price) return reject('订单价格不能为空');
      if (isNaN(parseFloat(params.order_price))) return reject('订单价格必须为数字');
      info.order_price = params.order_price;

      if (params.order_pay) {
        info.order_pay = params.order_pay;
      } else {
        info.order_pay = '0';
      }
      if (params.is_send) {
        if (Number(params.is_send) === 1) {
          info.is_send = '是';
        } else {
          info.is_send = '否';
        }
      } else {
        info.is_send = '否';
      }

      if (params.trade_no) {
        info.trade_no = '否';
      } else {
        info.trade_no = '';
      }

      if (params.order_fapiao_title) {
        if (
          params.order_fapiao_title !== '个人' &&
          params.order_fapiao_title !== '公司'
        ) {
          return reject('发票抬头必须是 个人 或 公司');
        }
        info.order_fapiao_title = params.order_fapiao_title;
      } else {
        info.order_fapiao_title = '个人';
      }

      if (params.order_fapiao_company) {
        info.order_fapiao_company = params.order_fapiao_company;
      } else {
        info.order_fapiao_company = '';
      }

      if (params.order_fapiao_content) {
        info.order_fapiao_content = params.order_fapiao_content;
      } else {
        info.order_fapiao_content = '';
      }

      if (params.consignee_addr) {
        info.consignee_addr = params.consignee_addr;
      } else {
        info.consignee_addr = '';
      }

      if (params.goods) {
        info.goods = params.goods;
      }

      // info.pay_status = params.pay_status;
      info.pay_status = '0';
      if (params.order_id) info.create_time = Date.parse(new Date().toString()) / 1000;
      info.update_time = Date.parse(new Date().toString()) / 1000;
      resolve(info);
    });
  }

  // function doCreateOrder(info) {
  //   return new Promise(function (resolve, reject) {
  //     dao.create('OrderModel', _.clone(info), function (err, newOrder) {
  //       if (err) return reject('创建订单失败')
  //       info.order = newOrder
  //       resolve(info)
  //     })
  //   })
  // }

  // function doCreateOrderGood(orderGood) {
  //   return new Promise(function (resolve, reject) {
  //     dao.create('OrderGoodModel', orderGood, function (err, newOrderGood) {
  //       if (err) return reject('创建订单商品失败')
  //       resolve(newOrderGood)
  //     })
  //   })
  // }

  // function doAddOrderGoods(info) {
  //   return new Promise(function (resolve, reject) {
  //     if (!info.order) return reject('订单对象未创建')

  //     var orderGoods = info.goods

  //     if (orderGoods && orderGoods.length > 0) {
  //       var fns = []
  //       var goods_total_price = _.sum(_.map(orderGoods, 'goods_price'))

  //       _(orderGoods).forEach(function (orderGood) {
  //         orderGood.order_id = info.order.order_id
  //         orderGood.goods_total_price = goods_total_price
  //         fns.push(doCreateOrderGood(orderGood))
  //       })
  //       Promise.all(fns)
  //         .then(function (results) {
  //           info.order.goods = results
  //           resolve(info)
  //         })
  //         .catch(function (error) {
  //           if (error) return reject(error)
  //         })
  //     } else {
  //       resolve(info)
  //     }
  //   })
  // }

  doGetAllOrderGoods(info) {
    const ctx = this.ctx;
    return new Promise(async function(resolve, reject) {
      if (!info.order) return reject('订单对象未创建');
      try {
        const orderGoods = await ctx.service.dao.index.list('OrderGoodModel', {
          columns: { order_id: info.order.order_id },
        });

        info.order.goods = orderGoods;
        resolve(info);
      } catch (error) {
        reject(error ?? '获取订单商品列表失败');
      }
    });
  }

  // function doGetOrder(info) {
  //   return new Promise(function (resolve, reject) {
  //     dao.show('OrderModel', info.order_id, function (err, newOrder) {
  //       if (err) return reject('获取订单详情失败')
  //       if (!newOrder) return reject('订单ID不能存在')
  //       info.order = newOrder
  //       resolve(info)
  //     })
  //   })
  // }

  doUpdateOrder(info) {
    const ctx = this.ctx;
    return new Promise(async function(resolve, reject) {
      try {
        const newOrder = await ctx.service.dao.index.update(
          'OrderModel',
          info.order_id,
          _.clone(info),
        );
        info.order = newOrder;
        resolve(info);
      } catch (error) {
        reject('更新失败');
      }
    });
  }

  // module.exports.createOrder = function (params, cb) {
  //   doCheckOrderParams(params)
  //     .then(doCreateOrder)
  //     .then(doAddOrderGoods)
  //     .then(function (info) {
  //       cb(null, info.order)
  //     })
  //     .catch(function (err) {
  //       cb(err)
  //     })
  // }

  // 处理参数
  getAllOrders(params) {
    const conditions: any = {};
    conditions.where = {};
    if (params.user_id) {
      conditions.where.user_id = params.user_id;
    }

    if (params.pay_status) {
      conditions.where.pay_status = params.pay_status;
    }

    if (params.is_send) {
      if (params.is_send === 1) {
        conditions.where.is_send = '是';
      } else {
        conditions.where.is_send = '否';
      }
    }

    if (params.order_fapiao_title) {
      if (params.order_fapiao_title === 1) {
        conditions.where.order_fapiao_title = '个人';
      } else {
        conditions.where.order_fapiao_title = '公司';
      }
    }

    if (params.order_fapiao_company) {
      // conditions.where.order_fapiao_company = Op.like(
      //   '%' + params.order_fapiao_company + '%',
      // );
      conditions.where.order_fapiao_company = {
        [Op.like]: `%${params.order_fapiao_company}%`,
      };
    }

    if (params.order_fapiao_content) {
      // conditions.where.order_fapiao_content = Op.like(
      //   '%' + params.order_fapiao_content + '%',
      // );
      conditions.where.order_fapiao_content = {
        [Op.like]: `%${params.order_fapiao_content}%`,
      };
    }

    if (params.consignee_addr) {
      // conditions.where.consignee_addr = Op.like('%' + params.consignee_addr + '%');
      conditions.where.consignee_addr = {
        [Op.like]: `%${params.consignee_addr}%`,
      };
    }

    return this.ctx.service.dao.index.findAndCountAll(
      'OrderModel',
      conditions,
      params.current,
      params.pageSize,
    );
    // dao.findAndCountAll(
    //   'OrderModel',
    //   conditions,
    //   params.current,
    //   params.pageSize,
    //   function(err, data) {
    //     if (err) return cb(err);
    //     const { count, rows: list } = data;
    //     // resultDta['goods'] = _.map(goods, function (good) {
    //     //   return _.omit(good, 'goods_introduce', 'is_del', 'goods_big_logo', 'goods_small_logo', 'delete_time')
    //     // })
    //     cb(null, data);
    //   },
    // );
  }

  // module.exports.getOrder = function (orderId, cb) {
  //   if (!orderId) return cb('用户ID不能为空')
  //   if (isNaN(parseInt(orderId))) return cb('用户ID必须是数字')

  //   doGetOrder({ order_id: orderId })
  //     .then(doGetAllOrderGoods)
  //     .then(function (info) {
  //       cb(null, info.order)
  //     })
  //     .catch(function (err) {
  //       cb(err)
  //     })
  // }

  async updateOrder(orderId, params) {
    params.order_id = orderId;
    try {
      const a: any = await this.doCheckOrderParams(params);
      const b: any = await this.doUpdateOrder(a);
      // const info: any = await this.doGetAllOrderGoods(b);
      return b;
    } catch (error) {
      return error;
    }
  }
}

module.exports = orderService;
