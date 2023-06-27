const { Sequelize, DataTypes, Model } = require('sequelize')
// const sequelize = new Sequelize('sqlite::memory:')
const { sequelize } = require('../modules/database')

// const User = sequelize.define(
//   'sp_user', // 别名
//   {
//     // 定义模型属性
//     // 需要根据数据库的结构定义
//     username: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       primaryKey: true,
//     },
//   },
//   {
//     // 这是其他模型参数
//     // 用来设置字段以外的其他信息
//     tableName: 'sp_user',
//     // timestamps: false,
//     freezeTableName: true,
//   }
// ) // 查询所有

// 添加与模型属性之一同名的公共类字段会出现问题. Sequelize 为通过 Model.init 定义的每个属性添加一个 getter 和一个 setter. 添加公共类字段将隐藏那些 getter 和 setter，从而阻止对模型的实际数据的访问.
// 添加与模型属性之一同名的公共类字段会出现问题. Sequelize 为通过 Model.init 定义的每个属性添加一个 getter 和一个 setter. 添加公共类字段将隐藏那些 getter 和 setter，从而阻止对模型的实际数据的访问.
// 在 TypeScript 中, 您可以使用 declare 关键字添加键入信息, 而无需添加实际的公共类字段:

class User extends Model {}
User.init(
  {
    // 在这里定义模型属性
    user_id: {
      type: Number,
      allowNull: false,
      primaryKey: true, // 主键属性
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    create_time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    update_time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    // 这是其他模型参数
    timestamps: false,
    freezeTableName: true,
    tableName: 'sp_user',
  }
)
// `sequelize.define` 会返回模型
// console.log(User === sequelize.models.User) // true
module.exports = User
// module.exports.User = User
