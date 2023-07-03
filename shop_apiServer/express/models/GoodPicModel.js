const { sequelize } = require('../modules/database')
const { DataTypes } = require('sequelize')

const GoodPicModel = sequelize.define(
  'sp_goods_pics', // 别名
  {
    pics_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    goods_id: Number,
    pics_big: String,
    pics_mid: String,
    pics_sma: String,
  },
  {
    // 这是其他模型参数
    // 用来设置字段以外的其他信息
    tableName: 'sp_goods_pics',
    timestamps: false,
    freezeTableName: true,
  }
) // 查询所有

module.exports = GoodPicModel
