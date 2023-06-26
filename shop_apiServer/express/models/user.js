const { Sequelize, DataTypes } = require('sequelize')
// const sequelize = new Sequelize('sqlite::memory:')
const { sequelize } = require('../modules/database')

const User = sequelize.define(
  'user', // 别名
  {
    // 定义模型属性
    // 需要根据数据库的结构定义
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // 这是其他模型参数
    // 用来设置字段以外的其他信息
    // tableName: 'user',
    timestamps: false,
    freezeTableName: true,
  }
) // 查询所有
module.exports = User
