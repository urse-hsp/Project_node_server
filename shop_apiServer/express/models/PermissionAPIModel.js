const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../modules/database')

class PermissionAPIModel extends Model {}
PermissionAPIModel.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    ps_id: Number,
    ps_api_service: String,
    ps_api_action: String,
    ps_api_order: Number,
  },

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    tableName: 'sp_permission_api',
  }
)
module.exports = PermissionAPIModel
