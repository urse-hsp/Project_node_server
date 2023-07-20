'use strict';

import { Service } from 'egg';
import _ from 'lodash';

class AttributeService extends Service {
  /**
   * 获取属性列表
   *
   * @param  {[type]}   cat_id 分类ID
   * @param  {[type]}   sel    类型 // only:输入框(唯一)  many:后台下拉列表/前台单选框
   */
  getAttributes(cat_id, sel) {
    try {
      return this.ctx.service.dao.attributeDAO.list(cat_id, sel);
    } catch (error) {
      return error ?? '获取失败';
    }
  }
  /**
   * 创建参数
   *
   * @param  {[type]}   info 参数信息
   */
  createAttribute(info) {
    try {
      return this.ctx.service.dao.index.create('AttributeModel', info);
    } catch (error) {
      return error ?? '创建失败';
    }
  }

  /**
   * 更新参数
   *
   * @param  {[type]}   catId  分类ID
   * @param  {[type]}   attrId 属性ID
   * @param  {[type]}   info   更新内容
   */
  async updateAttribute(attrId, info) {
    try {
      const newAttr = await this.ctx.service.dao.index.update(
        'AttributeModel',
        attrId,
        info,
      );
      return _.omit(newAttr, 'delete_time');
    } catch (error) {
      return error;
    }
  }

  /**
   * 删除参数
   *
   * @param  {[type]}   attrId 参数ID
   */
  deleteAttribute(attrId) {
    try {
      return this.ctx.service.dao.index.update('AttributeModel', attrId, {
        delete_time: parseInt((Date.now() / 1000).toString()),
      });
    } catch (error) {
      return error ?? '删除失败';
    }
  }
  // // 获取参数
  // module.exports.attributeById = function (attrId, cb) {
  //   dao.findByPk('AttributeModel', attrId, function (err, attr) {
  //     if (err) return cb(err)
  //     //  cb(null, _.omit(attr, 'delete_time'))
  //     cb(null, attr)
  //   })
  // }
}

module.exports = AttributeService;
