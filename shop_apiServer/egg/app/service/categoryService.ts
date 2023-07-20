'use strict';

import { Service } from 'egg';
import _ from 'lodash';

class ManagerService extends Service {
  /**
   * 判断是否删除
   *
   * @param  {[type]}  keyCategories 所有数据
   * @param  {[type]}  cat           [description]
   * @return {Boolean}               [description]
   */
  isDelete(keyCategories, cat) {
    if (cat.cat_pid === 0) {
      return cat.cat_deleted;
    } else if (cat.cat_deleted) {
      return true;
    }
    const parentCat = keyCategories[cat.cat_pid];
    if (!parentCat) return true;
    return this.isDelete(keyCategories, parentCat);
  }
  /**
   * 获取树状结果
   * @param  {[type]} keyCategories [description]
   * @return {[type]}               [description]
   */
  getTreeResult(keyCategories, categories, type) {
    const result: any[] = [];
    for (const idx in categories) {
      const cat = categories[idx];
      // 判断是否被删除
      if (this.isDelete(keyCategories, cat)) continue;
      if (cat.cat_pid === 0) {
        result.push(cat);
      } else {
        if (cat.cat_level >= type) continue;
        const parantCat = keyCategories[cat.cat_pid];
        if (!parantCat) continue;
        if (!parantCat.children) {
          parantCat.children = [];
        }
        parantCat.children.push(cat);
      }
    }
    return result;
  }
  // // 简化升级版本
  // /**
  //  * 根据id将数据组织成树状结构
  //  * @param ary 要组织的数据
  //  * @param pid 最顶层数据的id值
  //  * @param pidName 父id字段名
  //  * @returns {*}
  //  */
  // function formatToTree(ary, pid, pidName = 'cat_pid') {
  //   return ary
  //     .filter((item) => item[pidName] === pid && !item[pidName].cat_deleted)
  //     .map((item) => {
  //       // 通过父节点ID查询所有子节点
  //       item.children = formatToTree(ary, item.cat_id)
  //       return item
  //     })
  // }
  /**
   * 获取所有分类
   *
   * @param  {[type]}   type    描述显示层级
   */
  async getAllCategories(type, conditions) {
    try {
      const categories = await this.ctx.service.dao.index.list('CategoryModel', {
        where: { cat_deleted: false },
      });
      const data: any[] = [];
      for (const idx in categories) {
        const permission = categories[idx];
        data.push({
          cat_id: permission.cat_id,
          cat_deleted: !!permission.cat_deleted,
          cat_level: permission.cat_level,
          cat_name: permission.cat_name,
          cat_pid: permission.cat_pid,
        });
      }
      if (!type) type = 3;
      // const result = formatToTree(data, 0)
      const result = this.getTreeResult(_.keyBy(data, 'cat_id'), data, type);
      if (conditions) {
        const pageSize = parseInt(conditions.pageSize);
        const current = parseInt(conditions.current) - 1;
        const list = _.take(_.drop(result, current * pageSize), pageSize);
        const resultDta = {
          total: result.length,
          current: parseInt(conditions.current),
          pageSize,
          data: list,
        };
        return resultDta;
      }
      return result;
    } catch (error) {
      return error ?? '获取分类列表失败';
    }
  }
  // /**
  //  * 获取具体分类对象
  //  *
  //  * @param  {[type]}   id 分类ID
  //  * @param  {Function} cb 回调函数
  //  */
  // // module.exports.getCategoryById = function (id, cb) {
  // //   dao.show('CategoryModel', id, function (err, category) {
  // //     if (err) return cb('获取分类对象失败')
  // //     cb(null, category)
  // //   })
  // // }
  /**
   * 添加分类
   *
   * @param {[type]}   cat 分类数据
   * {
   * cat_pid  => 父类ID(如果是根类就赋值为0),
   * cat_name => 分类名称,
   * cat_level => 层级 (顶层为 0)
   * }
   *
   */
  addCategory(cat) {
    const { ctx } = this;

    try {
      return ctx.service.dao.index.create('CategoryModel', {
        cat_pid: cat.cat_pid,
        cat_name: cat.cat_name,
        cat_level: cat.cat_level,
      });
    } catch (error) {
      return '创建分类失败';
    }
  }
  /**
   * 更新分类
   *
   * @param  {[type]}   cat_id  分类ID
   * @param  {[type]}   newName 新的名称
   */
  updateCategory(cat_id, newName) {
    const { ctx } = this;
    try {
      return ctx.service.dao.index.update('CategoryModel', cat_id, { cat_name: newName });
    } catch (error) {
      return '更新失败';
    }
  }

  /**
   * 删除分类
   *
   * @param  {[type]}   cat_id 分类ID
   */
  deleteCategory(cat_id) {
    const { ctx } = this;
    try {
      return ctx.service.dao.index.update('CategoryModel', cat_id, { cat_deleted: true });
    } catch (error) {
      return '删除失败';
    }
  }
}

module.exports = ManagerService;
