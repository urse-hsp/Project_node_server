const { sequelize } = require('../modules/database')
const { Sequelize, DataTypes, Model } = require('sequelize')

class RoleModel extends Model {}
RoleModel.init(
  {
    // 在这里定义模型属性
    role_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    role_name: String,
    ps_ids: String,
    ps_ca: String,
    role_desc: String,
  },

  {
    sequelize,

    timestamps: false,
    freezeTableName: true,
    tableName: 'sp_role',
  }
)
module.exports = RoleModel
