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
    let sql =
      'SELECT * FROM sp_manager as mgr LEFT JOIN sp_role as role ON mgr.role_id = role.role_id';
    if (key) {
      sql += ` WHERE mg_name LIKE '%${key}%'`;
    }
    if ((current ?? '') !== '' && (pageSize ?? '') !== '') {
      sql += ` LIMIT ${current},${pageSize}`;
    }

    return ctx.model.query(sql, { type: QueryTypes.SELECT });
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
    return ctx.model.query(sql, { type: QueryTypes.SELECT });
  }

  // /**
  //  * 通过ID获取管理员对象数据
  //  *
  //  * @param  {[type]}   id 管理员主键ID
  //  * @param  {Function} cb 回调函数
  //  */
  // module.exports.show = function (id, cb) {
  //   daoModule.findByPk('ManagerModel', id, cb, 'mg_id')
  // }
  // /**
  //  * 更新管理员信息
  //  *
  //  * @param  {[type]}   obj 管理员对象
  //  * @param  {Function} cb  回调函数
  //  */
  // module.exports.update = function (obj, cb) {
  //   daoModule.update('ManagerModel', obj.mg_id, obj, cb, 'mg_id')
  // }

  // /**
  //  * 删除管理员对象数据
  //  *
  //  * @param  {[type]}   id 主键ID
  //  * @param  {Function} cb 回调函数
  //  */
  // module.exports.destroy = function (id, cb) {
  //   daoModule.destroy(
  //     'ManagerModel',
  //     id,
  //     function (err) {
  //       if (err) return cb(err)
  //       return cb(null)
  //     },
  //     'mg_id'
  //   )
  // }

  // /**
  //  * 创建/修改管理员信息
  //  *
  //  * @param  {[type]}   obj 管理员对象
  //  * @param  {Function} cb  回调函数
  //  */
  // module.exports.save = function (obj, cb) {
  //   daoModule.findByPk(
  //     'ManagerModel',
  //     obj.mg_id,
  //     function (err, oldObj) {
  //       // if (err) {
  //       //   daoModule.create('ManagerModel', obj, cb)
  //       // } else {
  //       //   daoModule.update('ManagerModel', obj.mg_id, obj, cb)
  //       // }
  //     },
  //     'mg_id'
  //   )
  //   // daoModule.show(obj.mg_id, function (err, oldObj) {
  //   //   if (err) {
  //   //     daoModule.create('ManagerModel', obj, cb)
  //   //   } else {
  //   //     daoModule.update('ManagerModel', obj.mg_id, obj, cb)
  //   //   }
  //   // })
  // }
}

module.exports = managersDAO;
