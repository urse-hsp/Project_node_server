const { DataTypes } = require('sequelize')
const { sequelize } = require('../modules/database')

const CategoryModel = sequelize.define(
  'sp_category', // 别名
  {
    cat_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    cat_name: String,
    cat_pid: Number,
    cat_level: Number,
    cat_deleted: Boolean,
  },
  {
    // 这是其他模型参数
    // 用来设置字段以外的其他信息
    tableName: 'sp_category',
    timestamps: false,
    freezeTableName: true,
  }
) // 查询所有

module.exports = CategoryModel
