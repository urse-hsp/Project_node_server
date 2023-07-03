const { Sequelize, DataTypes, Model, QueryTypes } = require('sequelize')
const { sequelize } = require('../modules/database')

class GoodAttributeModel extends Model {}
GoodAttributeModel.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    goods_id: Number,
    attr_id: Number,
    attr_value: String,
    add_price: Number,
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    tableName: 'sp_goods_attr',
  }
)
// `sequelize.define` 会返回模型
module.exports = GoodAttributeModel
