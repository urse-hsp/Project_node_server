'use strict';

module.exports = app => {
  const { INTEGER } = app.Sequelize;

  const GoodPicModel = app.model.define(
    'sp_goods_pics',
    {
      pics_id: { type: INTEGER, autoIncrement: true, primaryKey: true },
      goods_id: Number,
      pics_big: String,
      pics_mid: String,
      pics_sma: String,
    },
    { tableName: 'sp_goods_pics', timestamps: false, freezeTableName: true },
  );

  return GoodPicModel;
};
