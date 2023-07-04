const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../modules/database')

class ReportOneModel extends Model {}
ReportOneModel.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    rp1_user_count: Number,
    rp1_area: Number,
    rp1_date: { type: 'date', time: false },
  },

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    tableName: 'sp_report_1',
  }
)
module.exports = ReportOneModel
