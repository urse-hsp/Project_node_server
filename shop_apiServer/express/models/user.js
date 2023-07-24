const { Sequelize, DataTypes, Model } = require('sequelize')
const { sequelize } = require('../modules/database')

// 添加与模型属性之一同名的公共类字段会出现问题. Sequelize 为通过 Model.init 定义的每个属性添加一个 getter 和一个 setter. 添加公共类字段将隐藏那些 getter 和 setter，从而阻止对模型的实际数据的访问.
// 添加与模型属性之一同名的公共类字段会出现问题. Sequelize 为通过 Model.init 定义的每个属性添加一个 getter 和一个 setter. 添加公共类字段将隐藏那些 getter 和 setter，从而阻止对模型的实际数据的访问.
// 在 TypeScript 中, 您可以使用 declare 关键字添加键入信息, 而无需添加实际的公共类字段:

class User extends Model {}
User.init(
  {
    // 在这里定义模型属性
    user_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
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
module.exports = User
// module.exports.User = User
