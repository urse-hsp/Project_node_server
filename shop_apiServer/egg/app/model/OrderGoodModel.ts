'use strict';

module.exports = app => {
  const { INTEGER } = app.Sequelize;

  const OrderGoodModel = app.model.define(
    'OrderGoodModel',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      order_id: Number,
      goods_id: Number,
      goods_price: Number,
      goods_number: Number,
      goods_total_price: Number,
    },
    {
      table: 'sp_order_goods',
      timestamps: false,
      freezeTableName: true,
    },
  );

  return OrderGoodModel;
};
