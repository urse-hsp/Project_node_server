const { Sequelize, DataTypes, Model } = require('sequelize')
const { sequelize } = require('../modules/database')

const OrderModel = sequelize.define(
  'sp_order', // 别名
  {
    order_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: Number,
    order_number: String,
    order_price: Number,
    order_pay: [1, 2, 3],
    is_send: ['是', '否'],
    trade_no: String,
    order_fapiao_title: ['个人', '公司'],
    order_fapiao_company: String,
    order_fapiao_content: String,
    consignee_addr: String,
    pay_status: ['0', '1'],
    create_time: Number,
    update_time: Number,
  },
  {
    // 这是其他模型参数
    // 用来设置字段以外的其他信息
    tableName: 'sp_order',
    timestamps: false,
    freezeTableName: true,
  }
) // 查询所有
module.exports = OrderModel
