const { Sequelize, DataTypes, Model } = require('sequelize')
const { sequelize } = require('../modules/database')

class ManagerModel extends Model {}
ManagerModel.init(
  {
    // 在这里定义模型属性
    mg_id: { type: 'serial', key: true },
    mg_name: String,
    mg_pwd: String,
    mg_time: Number,
    role_id: Number,
    mg_mobile: String,
    mg_email: String,
    mg_state: Number,
  },
  {
    sequelize,
    // 这是其他模型参数
    timestamps: false,
    freezeTableName: true,
    tableName: 'sp_manager',
  }
)
// `sequelize.define` 会返回模型
console.log(ManagerModel === sequelize.models.ManagerModel) // true
module.exports = ManagerModel
