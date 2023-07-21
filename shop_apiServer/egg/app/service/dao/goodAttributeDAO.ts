import { Service } from 'egg';
import { QueryTypes } from 'sequelize';

class goodAttributeDao extends Service {
  async clearGoodAttributes(goods_id) {
    const ctx = this.ctx;
    const sql = `DELETE FROM sp_goods_attr WHERE goods_id = ${goods_id}`;
    try {
      return await await ctx.model.query(sql, { type: QueryTypes.SELECT });
    } catch (error) {
      return '删除出错';
    }
  }

  async list(goods_id) {
    const ctx = this.ctx;
    const sql = `SELECT good_attr.goods_id,good_attr.attr_id,good_attr.attr_value,good_attr.add_price,attr.attr_name,attr.attr_sel,attr.attr_write,attr.attr_vals FROM sp_goods_attr as good_attr LEFT JOIN sp_attribute as attr ON attr.attr_id = good_attr.attr_id WHERE good_attr.goods_id = ${goods_id}`;
    try {
      return await ctx.model.query(sql, { type: QueryTypes.SELECT });
    } catch (error) {
      return '删除出错';
    }
  }
}

module.exports = goodAttributeDao;
