const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../modules/database')

class ReportTwoModel extends Model {}
ReportTwoModel.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    rp2_page: String,
    rp2_count: Number,
    rp2_date: { type: 'date', time: false },
  },

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    tableName: 'sp_report_2',
  }
)
module.exports = ReportTwoModel
