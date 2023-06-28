const { sequelize } = require('../modules/database')

class RoleModel extends Model {}
RoleModel.init(
  {
    // 在这里定义模型属性
    role_id: { type: 'serial', primaryKey: true },
    role_name: String,
    ps_ids: String,
    ps_ca: String,
    role_desc: String,
  },

  {
    sequelize,
    tableName: 'sp_manager',
  }
)
module.exports = RoleModel
