import { Service } from 'egg';
import { QueryTypes } from 'sequelize';

class managersDAO extends Service {
  root: string;
  constructor(ctx) {
    super(ctx);
    this.root = 'https://cnodejs.org/api/v1';
  }

  // 用户表，角色表
  async findByKey(key, current, pageSize) {
    const ctx = this.ctx;
    let sql = '';
    if (key) {
      sql += ` WHERE mg_name LIKE '%${key}%'`;
    }
    if ((current ?? '') !== '' && (pageSize ?? '') !== '') {
      sql += ` LIMIT ${current},${pageSize}`;
    }

    try {
      const data = await ctx.model.query(sql, { type: QueryTypes.SELECT });
      return data;
    } catch (error) {
      return '查询执行出错';
    }
  }

  /**
   * 模糊查询用户数量 total
   *
   * @param  {[type]}   key 关键词
   * @param  {Function} cb  回调函数
   */
  async countByKey(key) {
    const ctx = this.ctx;
    let sql = 'SELECT count(*) as count FROM sp_manager';
    if (key) {
      sql += ` WHERE mg_name LIKE '%${key}%'`;
    }
    try {
      const users: any = await ctx.model.query(sql, { type: QueryTypes.SELECT });
      return users[0].count;
    } catch (error) {
      return '查询执行出错';
    }
  }
}

module.exports = managersDAO;
