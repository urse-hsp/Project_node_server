'use strict';

module.exports = app => {
  const { INTEGER } = app.Sequelize;

  const OrderModel = app.model.define(
    'sp_order',
    {
      order_id: { type: INTEGER, autoIncrement: true, primaryKey: true },
      user_id: Number,
      order_number: String,
      order_price: Number,
      order_pay: [ 1, 2, 3 ],
      is_send: [ '是', '否' ],
      trade_no: String,
      order_fapiao_title: [ '个人', '公司' ],
      order_fapiao_company: String,
      order_fapiao_content: String,
      consignee_addr: String,
      pay_status: [ '0', '1' ],
      create_time: Number,
      update_time: Number,
    },
    { tableName: 'sp_order', timestamps: false, freezeTableName: true },
  );

  return OrderModel;
};
