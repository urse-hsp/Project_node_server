'use strict';

import { Service } from 'egg';

// function toInt(str) {
//   if (typeof str === 'number') return str;
//   if (!str) return str;
//   return parseInt(str, 10) || 0;
// }

class DAOService extends Service {
  /**
   * 获取模型
   *
   * @param  {[type]}   modelName 模型名称
   * @param  {[type]}   type api类型
   * @param  {[type]}   conditions 查询条件
   * @param  {Function} updateObj  update 更新数据
   */
  async getModel(modelName: string, type: string, conditions: any = {}, updateObj = {}) {
    const ctx = this.ctx;
    const model = ctx.model[modelName];
    if (!model) {
      console.warn('模型不存在');
      return '模型不存在';
    }
    if (type === 'update') {
      return model[type](updateObj, conditions);
    }
    return model[type](conditions);
  }

  /**
   * 创建对象数据
   *
   * @param  {[type]}   modelName 模型名称
   * @param  {[type]}   conditions 查询条件
   */
  create(modelName: string, conditions: any) {
    return this.getModel(modelName, 'create', conditions);
  }

  /**
   * 获取所有数据/查询所有数据
   *
   * @param  {[type]}   modelName  模块名
   * @param  {[type]}   conditions 查询条件
   */
  list(modelName: string, conditions: any) {
    return this.getModel(modelName, 'findAll', conditions);
  }

  /**
   * 计数按条件查询
   *
   * @param  {[type]}   modelName  模块名
   * @param  {[type]}   conditions 条件
   * @param  {[type]}   current 页输
   * @param  {[type]}   Size 获取几条数据
   */
  findAndCountAll(modelName: string, conditions: any, current, Size) {
    if (!current) return 'current 参数不合法';
    if (!Size) return 'pageSize 参数不合法';

    // sql 默认从0页开始
    const currentPage = Number(current) - 1,
      pageSize = Number(Size);
    // sql 默认从0开始

    const params = {
      ...conditions,
      offset: currentPage * pageSize, // offset 跳过n个实例/行
      limit: pageSize, // 提取10个实例/行
    };
    try {
      const { count, rows }: any = this.getModel(modelName, 'findAndCountAll', params);
      return {
        total: count,
        current: Number(current),
        pageSize: params.limit,
        data: rows,
      };
    } catch (error) {
      return error;
    }
  }

  /**
   * 获取一条数据 findOne 方法获得它找到的第一个条目(它可以满足提供的可选查询参数).
   * @param  {[type]}   modelName  模型名称
   * @param  {[数组]}   conditions  条件集合
   */
  findOne(modelName: string, conditions: any) {
    return this.getModel(modelName, 'findOne', conditions);
  }

  /**
   * 更新对象数据
   *
   * @param  {[type]}   modelName 模型名称
   * @param  {[type]}   id        数据关键ID
   * @param  {[type]}   updateObj 更新对象数据
   * @param  {Function} key       删除键值
   */
  async update(modelName, id, updateObj, key) {
    if (key) {
      return this.getModel(modelName, 'update', { where: { [key]: id } }, updateObj);
    }
    // *TOP1* 先查后改，执行两遍sql
    const res: any = await this.findByPk(modelName, id);
    if (!res) {
      return '查询失败';
    }
    return res.update(updateObj);
  }

  /**
   * 通过主键ID获取对象 / show
   * @param  {[type]}   modelName 模型名称
   * @param  {[type]}   id        主键ID
   */
  findByPk(modelName, id) {
    return this.getModel(modelName, 'findByPk', id);
  }
  show = this.findByPk;

  /**
   * 通过主键ID删除对象
   *
   * @param  {[type]}   modelName 模型名称
   * @param  {[type]}   id        主键ID
   * @param  {Function} key       删除键值
   */
  async destroy(modelName, id, key) {
    if (key) {
      // *TOP2* 直接删除，执行一遍sql
      return this.getModel(modelName, 'destroy', { where: { [key]: id } }, '删除失败');
    }
    // *TOP1* 先查后改，执行两遍sql
    const res: any = await this.findByPk(modelName, id);
    if (!res) {
      return '查询失败';
    }
    return res.destroy();
  }

  /**
   * 通过模型名称获取数据库数量 total
   *
   * @param  {[type]}   modelName 模型名称
   */
  count(modelName) {
    return this.getModel(modelName, 'count', null);
  }

  /**
   * 通过条件判断数据是否存在
   *
   * @param  {[type]}   modelName  模块名
   * @param  {[type]}   conditions 条件
   */
  exists(modelName: string, conditions: any) {
    return this.findOne(modelName, conditions);
  }

  /**
   * 查找或创建
   * 找到一个满足查询参数的结果,否则方法 findOrCreate 将在表中创建一个条目
   *
   * @param  {[type]}   modelName  模块名
   * @param  {[type]}   where 条件
   * @param  {[type]}   defaults 定义必须创建的内容
   */
  // async findOrCreate(modelName, where, defaults) {}
}

module.exports = DAOService;
