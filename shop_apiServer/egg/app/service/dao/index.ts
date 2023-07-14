'use strict';

import { Service } from 'egg';

class DAOService extends Service {
  root: string;
  constructor(ctx) {
    super(ctx);
    this.root = 'https://cnodejs.org/api/v1';
  }
  fn() {
    console.log(1);
  }
  /**
   * 获取模型
   *
   * @param  {[type]}   modelName 模型名称
   * @param  {[type]}   type api类型
   * @param  {[type]}   conditions 查询条件
   * @param  {Function} cb        回调函数
   * @param  {[type]}   errMeg        错误信息
   */
  async getModel(
    modelName: string,
    type: string,
    conditions: any,
    cb,
    errMeg = '查询失败',
  ) {
    const ctx = this.ctx;
    const model = ctx.model[modelName];
    if (!model) return cb('模型不存在', null);
    try {
      const res = await model[type](conditions ?? {});
      cb?.(null, res);
    } catch (error) {
      cb?.(errMeg);
    }
  }

  /**
   * 创建对象数据
   *
   * @param  {[type]}   modelName 模型名称
   * @param  {[type]}   conditions 查询条件
   * @param  {Function} cb        回调函数
   */
  create(modelName: string, conditions: any, cb: () => any) {
    this.getModel(modelName, 'create', conditions, cb);
  }

  /**
   * 获取所有数据/查询所有数据
   *
   * @param  {[type]}   modelName  模块名
   * @param  {[type]}   conditions 查询条件
   * 查询条件统一规范
   * conditions
   * @param  {Function} cb         回调函数
   */
  list(modelName: string, conditions: any, cb: () => any) {
    this.getModel(modelName, 'findAll', conditions, cb);
  }

  /**
   * 计数按条件查询
   *
   * @param  {[type]}   modelName  模块名
   * @param  {[type]}   conditions 条件
   * @param  {[type]}   current 页输
   * @param  {[type]}   Size 获取几条数据
   * @param  {Function} cb         回调函数
   */
  findAndCountAll(modelName: string, conditions: any, current, Size, cb) {
    if (!current) return cb('current 参数不合法');
    if (!Size) return cb('pageSize 参数不合法');

    // sql 默认从0页开始
    const currentPage = Number(current) - 1,
      pageSize = Number(Size);
    // sql 默认从0开始

    const params = {
      ...conditions,
      offset: currentPage * pageSize, // offset 跳过n个实例/行
      limit: pageSize, // 提取10个实例/行
    };
    this.getModel(modelName, 'findAndCountAll', params, async (err, { count, rows }) => {
      if (err) return cb(err);
      cb(null, {
        total: count,
        current: Number(current),
        pageSize: params.limit,
        data: rows,
      });
    });
  }

  /**
   * 获取一条数据 findOne 方法获得它找到的第一个条目(它可以满足提供的可选查询参数).
   * @param  {[type]}   modelName  模型名称
   * @param  {[数组]}   conditions  条件集合
   * @param  {Function} cb         回调函数
   */
  findOne(modelName: string, conditions: any, cb: () => any) {
    this.getModel(modelName, 'findOne', { where: conditions }, cb);
  }

  /**
   * 更新对象数据
   *
   * @param  {[type]}   modelName 模型名称
   * @param  {[type]}   id        数据关键ID
   * @param  {[type]}   updateObj 更新对象数据
   * @param  {Function} cb        回调函数
   * @param  {Function} key       删除键值
   */
  async update(modelName, id, updateObj, cb, key) {
    if (key) {
      //  *TOP2* 直接修改，执行一遍sql
      const ctx = this.ctx;
      const model = ctx.model[modelName];
      if (!model) return cb('模型不存在', null);
      try {
        const res = await model.update(updateObj, { where: { [key]: id } });
        cb(null, res);
      } catch (error) {
        cb('修改失败', null);
      }
    } else {
      // *TOP1* 先查后改，执行两遍sql
      this.findByPk(modelName, id, async (_err, res) => {
        try {
          res.set(updateObj);
          await res.save();
          cb(null, res);
        } catch (error) {
          cb('删除失败');
        }
      });
    }
  }

  /**
   * 通过主键ID获取对象 / show
   * @param  {[type]}   modelName 模型名称
   * @param  {[type]}   id        主键ID
   * @param  {Function} cb        回调函数
   */
  findByPk(modelName, id, cb) {
    this.getModel(modelName, 'findByPk', id, cb);
  }
  show = this.findByPk;

  /**
   * 通过主键ID删除对象
   *
   * @param  {[type]}   modelName 模型名称
   * @param  {[type]}   id        主键ID
   * @param  {Function} cb        回调函数
   * @param  {Function} key       删除键值
   */
  destroy(modelName, id, cb, key) {
    if (key) {
      // *TOP2* 直接删除，执行一遍sql
      this.getModel(modelName, 'destroy', { where: { [key]: id } }, cb, '删除失败');
    } else {
      // *TOP1* 先查后改，执行两遍sql
      this.findByPk(modelName, id, async (_err, res) => {
        try {
          await res.destroy();
          cb(null);
        } catch (error) {
          cb('删除失败');
        }
      });
    }
  }

  /**
   * 通过模型名称获取数据库数量 total
   *
   * @param  {[type]}   modelName 模型名称
   * @param  {Function} cb        回调函数
   */
  count(modelName, cb) {
    this.getModel(modelName, 'count', null, cb);
  }

  /**
   * 通过条件判断数据是否存在
   *
   * @param  {[type]}   modelName  模块名
   * @param  {[type]}   conditions 条件
   * @param  {Function} cb         回调函数
   */
  exists(modelName: string, conditions: any, cb: () => any) {
    this.findOne(modelName, conditions, cb);
  }

  /**
   * 查找或创建
   * 找到一个满足查询参数的结果,否则方法 findOrCreate 将在表中创建一个条目
   *
   * @param  {[type]}   modelName  模块名
   * @param  {[type]}   where 条件
   * @param  {[type]}   defaults 定义必须创建的内容
   * @param  {Function} cb         回调函数
   */
  // async findOrCreate(modelName, where, defaults, cb) {}
}

module.exports = DAOService;
