import { Service } from 'egg';
import { QueryTypes } from 'sequelize';

class AttributeDAO extends Service {
  /**
   * 获取参数列表数据
   *
   * @param  {[type]}   cat_id 分类ID
   * @param  {[type]}   sel    类型
   */
  async list(cat_id, sel) {
    const ctx = this.ctx;

    try {
      const sql = `SELECT * FROM sp_attribute WHERE cat_id = '${cat_id}' AND attr_sel = '${sel}' AND delete_time is NULL`;
      return await ctx.model.query(sql, { type: QueryTypes.SELECT });
    } catch (error) {
      return '查询执行出错';
    }
  }
}

module.exports = AttributeDAO;
