const path = require('path')
daoModule = require('./DAO')
const { DataTypes } = require('sequelize')
const { sequelize } = require(path.join(process.cwd(), 'modules/database'))

module.exports.clearGoodAttributes = async function (goods_id, cb) {
  sql = `DELETE FROM sp_goods_attr WHERE goods_id = ${goods_id}`
  try {
    await sequelize.query(sql, { type: DataTypes.SELECT })
    cb(null)
  } catch (error) {
    cb('删除出错')
  }
}

module.exports.list = async function (goods_id, cb) {
  sql = `SELECT good_attr.goods_id,good_attr.attr_id,good_attr.attr_value,good_attr.add_price,attr.attr_name,attr.attr_sel,attr.attr_write,attr.attr_vals FROM sp_goods_attr as good_attr LEFT JOIN sp_attribute as attr ON attr.attr_id = good_attr.attr_id WHERE good_attr.goods_id = ${goods_id}`

  try {
    await sequelize.query(sql, { type: DataTypes.SELECT })
    cb(null)
  } catch (error) {
    cb('删除出错')
  }
}
