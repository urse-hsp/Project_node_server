'use strict';
// import { DataTypes } from 'sequelize';

module.exports = app => {
  const { INTEGER } = app.Sequelize;

  const User = app.model.define(
    'GoodModel',
    {
      goods_id: { type: INTEGER, autoIncrement: true, primaryKey: true },
      cat_id: Number,
      goods_name: String,
      goods_price: Number,
      goods_number: Number,
      goods_weight: Number,
      goods_introduce: String,
      goods_big_logo: String,
      goods_small_logo: String,
      goods_state: Number, // 0：未审核 1: 审核中 2: 已审核
      is_del: [ '0', '1' ], // 0: 正常 , 1: 删除
      add_time: Number,
      upd_time: Number,
      delete_time: Number,
      hot_mumber: Number,
      is_promote: Boolean,
      cat_one_id: Number,
      cat_two_id: Number,
      cat_three_id: Number,
    },
    {
      tableName: 'sp_goods',
      timestamps: false,
      freezeTableName: true,
    },
  );

  return User;
};
