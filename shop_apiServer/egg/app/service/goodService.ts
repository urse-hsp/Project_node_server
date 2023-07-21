'use strict';

import { Service } from 'egg';
import Sequelize from 'sequelize';
import _ from 'lodash';
import fs from 'fs';
import path from 'path';

const Op = Sequelize.Op;

class GoodService extends Service {
  root: string;
  constructor(ctx) {
    super(ctx);
    this.root = 'https://cnodejs.org/api/v1';
  }

  /**
   * 裁剪图片
   *
   * @param  {[type]} srcPath   原始图片路径
   * @param  {[type]} savePath  存储路径
   * @param  {[type]} newWidth  新的宽度
   * @param  {[type]} newHeight 新的高度
   * @return {[type]}           [description]
   */
  clipImage(srcPath, savePath) {
    return new Promise<void>(function(resolve) {
      // 创建读取流
      const readable = fs.createReadStream(srcPath);
      // 创建写入流
      const writable = fs.createWriteStream(savePath);
      readable.pipe(writable);
      readable.on('end', function() {
        resolve();
      });
    });
  }

  /**
   * 通过参数生成产品基本信息
   *
   * @param  {[type]} params.cb [description]
   * @return {[type]}           [description]
   */
  generateGoodInfo(params) {
    return new Promise(function(resolve, reject) {
      const info: any = {};
      if (params.goods_id) info.goods_id = params.goods_id;
      if (!params.goods_name) return reject('商品名称不能为空');
      info.goods_name = params.goods_name;
      if (!params.goods_price) return reject('商品价格不能为空');
      const price = parseFloat(params.goods_price);
      if (isNaN(price) || price < 0) return reject('商品价格不正确');
      info.goods_price = price;
      if (!params.goods_number) return reject('商品数量不能为空');
      const num = parseInt(params.goods_number);
      if (isNaN(num) || num < 0) return reject('商品数量不正确');
      info.goods_number = num;
      if (!params.goods_cat) return reject('商品没有设置所属分类');
      const cats = params?.goods_cat.split(',');
      if (cats.length > 0) {
        info.cat_one_id = cats[0];
      }
      if (cats.length > 1) {
        info.cat_two_id = cats[1];
      }
      if (cats.length > 2) {
        info.cat_three_id = cats[2];
        info.cat_id = cats[2];
      }
      if (params.goods_weight) {
        const weight = parseFloat(params.goods_weight);
        if (isNaN(weight) || weight < 0) return reject('商品重量格式不正确');
        info.goods_weight = weight;
      } else {
        info.goods_weight = 0;
      }
      if (params.goods_introduce) {
        info.goods_introduce = params.goods_introduce;
      }
      if (params.goods_big_logo) {
        info.goods_big_logo = params.goods_big_logo;
      } else {
        info.goods_big_logo = '';
      }
      if (params.goods_small_logo) {
        info.goods_small_logo = params.goods_small_logo;
      } else {
        info.goods_small_logo = '';
      }
      if (params.goods_state) {
        info.goods_state = params.goods_state;
      }
      // 图片
      if (params.pics) {
        info.pics = params.pics;
      }
      // 属性
      if (params.attrs) {
        info.attrs = params.attrs;
      }
      info.add_time = Date.parse(new Date().toString()) / 1000;
      info.upd_time = Date.parse(new Date().toString()) / 1000;
      info.is_del = '0';
      if (params.hot_mumber) {
        const hot_num = parseInt(params.hot_mumber);
        if (isNaN(hot_num) || hot_num < 0) return reject('热销品数量格式不正确');
        info.hot_mumber = hot_num;
      } else {
        info.hot_mumber = 0;
      }
      info.is_promote = info.is_promote ? info.is_promote : false;
      resolve(info);
    });
  }
  /**
   * 检查商品名称是否重复
   *
   * @param  {[type]} info [description]
   * @return {[type]}      [description]
   */
  checkGoodName = info => {
    const ctx = this.ctx;
    return new Promise(async function(resolve, reject) {
      try {
        const good = await ctx.service.dao.index.findOne('GoodModel', {
          where: {
            goods_name: info.goods_name,
            is_del: '0',
          },
        });
        if (!good) return resolve(info);
        if (Number(good.goods_id) === Number(info.goods_id)) return resolve(info);
        return reject('商品名称已存在');
      } catch (error) {
        return error;
      }
    });
  };
  /**
   * 创建商品基本信息
   *
   * @param  {[type]} info [description]
   * @return {[type]}      [description]
   */
  createGoodInfo = info => {
    const ctx = this.ctx;
    const params = _.clone(info);
    return new Promise(async function(resolve, reject) {
      try {
        const newGood = await ctx.service.dao.index.create('GoodModel', params);
        newGood.goods_cat =
          newGood.cat_one_id + ',' + newGood.cat_two_id + ',' + newGood.cat_three_id;
        params.goods = newGood;

        resolve(params);
      } catch (error) {
        reject('创建商品基本信息失败');
      }
    });
  };

  /**
   * 更新产品/修改
   *
   * @param  {[type]} info [description]
   */
  updateGoodInfo = info => {
    const ctx = this.ctx;
    return new Promise(async function(resolve, reject) {
      if (!info.goods_id) return reject('商品ID不存在');
      try {
        const newGood = await ctx.service.dao.index.update(
          'GoodModel',
          info.goods_id,
          _.clone(info),
        );
        info.good = newGood;
        return resolve(info);
      } catch (error) {
        reject('更新商品基本信息失败');
      }
    });
  };

  /**
   * 获取商品对象
   *
   * @param  {[type]} info 查询内容
   * @return {[type]}      [description]
   */
  getGoodInfo(info) {
    const ctx = this.ctx;
    return new Promise(async function(resolve, reject) {
      if (!info || !info.goods_id || isNaN(info.goods_id)) {
        return reject('商品ID格式不正确');
      }
      try {
        const good = await ctx.service.dao.index.findByPk('GoodModel', info.goods_id);
        good.get('', { plain: true });
        info.good = {
          ...good.dataValues,
          goods_cat: good.cat_one_id + ',' + good.cat_two_id + ',' + good.cat_three_id,
        };
        return resolve(info);
      } catch (error) {
        return '获取商品基本信息失败';
      }
    });
  }

  /**
   * 删除商品图片
   *
   * @param  {[type]} pic 图片对象
   * @return {[type]}     [description]
   */
  removeGoodPic(pic) {
    const ctx = this.ctx;
    return new Promise(async function(resolve, reject) {
      try {
        await ctx.service.dao.index.destroy('GoodPicModel', pic.pics_id);
        resolve(true);
      } catch (error) {
        reject('删除商品图片记录失败');
      }
    });
  }

  removeGoodPicFile(path: any) {
    return new Promise<void>(function(resolve) {
      // eslint-disable-next-line node/prefer-promises/fs
      fs.unlink(path, function() {
        resolve();
      });
    });
  }

  // 创建 GoodPic
  createGoodPic(pic) {
    const ctx = this.ctx;
    return new Promise(async function(resolve, reject) {
      if (!pic) return reject('图片对象不能为空');
      try {
        const data = await ctx.service.dao.index.create('GoodPicModel', pic);
        resolve(data);
      } catch (error) {
        reject('创建图片数据失败');
      }
    });
  }

  /**
   * 更新商品图片
   *
   * @param  {[type]} info    参数
   * @param  {[type]} newGood 商品基本信息
   */
  doUpdateGoodPics = info => {
    const ctx = this.ctx;
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this: any = this;
    const { upload_config } = this.config;
    return new Promise(async (resolve, reject) => {
      const good = info.good;
      if (!good.goods_id) return reject('更新商品图片失败');
      if (!info.pics) return resolve(info);

      try {
        const oldpics = await ctx.service.dao.index.list('GoodPicModel', {
          where: { goods_id: good.goods_id },
        });

        const batchFns: any = [];
        const newpics = info.pics ? info.pics : [];
        const newpicsKV = _.keyBy(newpics, 'pics_id');
        /**
         * 保存图片集合
         */
        // 需要新建的图片集合
        const addNewpics: any[] = [];
        // 需要保留的图片的集合
        const reservedOldpics: any[] = [];
        // 需要删除的图片集合
        const delOldpics: any[] = [];
        // 如果提交的新的数据中有老的数据的pics_id就说明保留数据，否则就删除
        _(oldpics).forEach(function(pic) {
          if (newpicsKV[pic.pics_id]) {
            reservedOldpics.push(pic);
          } else {
            delOldpics.push(pic);
          }
        });
        // 从新提交的数据中检索出需要新创建的数据
        // 计算逻辑如果提交的数据不存在 pics_id 字段说明是新创建的数据
        _(newpics).forEach(function(pic) {
          if (!pic.pics_id && pic.pic) {
            addNewpics.push(pic);
          }
        });

        // 开始处理商品图片数据逻辑
        // 1. 删除商品图片数据集合
        _(delOldpics).forEach(pic => {
          batchFns.push(
            _this.removeGoodPicFile(path.join(process.cwd(), 'app' + pic.pics_big)),
          );
          // 1.1 删除图片物理路径
          // batchFns.push(_this.removeGoodPicFile(path.join(process.cwd(), pic.pics_big)));
          // batchFns.push(_this.removeGoodPicFile(path.join(process.cwd(), pic.pics_mid)));
          // batchFns.push(_this.removeGoodPicFile(path.join(process.cwd(), pic.pics_sma)));
          // 1.2 数据库中删除图片数据记录
          batchFns.push(_this.removeGoodPic(pic));
          console.log('删除');
        });

        // 2. 处理新建图片的集合
        _(addNewpics).forEach(function(pic) {
          if (!pic.pics_id && pic.pic) {
            // 2.1 通过原始图片路径裁剪出需要的图片
            const src = path.join(process.cwd(), pic.pic);
            const tmp = src.split(path.sep);
            const filename = tmp[tmp.length - 1];
            pic.pics_big = upload_config.upload_path + filename; // /big_
            pic.pics_mid = upload_config.upload_path + filename; // /mid_
            pic.pics_sma = upload_config.upload_path + filename; // /sma_
            // batchFns.push(
            //   _this.clipImage(src, path.join(process.cwd(), pic.pics_big), 800, 800),
            // );
            // batchFns.push(
            //   _this.clipImage(src, path.join(process.cwd(), pic.pics_mid), 400, 400),
            // );
            // batchFns.push(
            //   _this.clipImage(src, path.join(process.cwd(), pic.pics_sma), 200, 200),
            // );
            pic.goods_id = good.goods_id;
            // 2.2 数据库中新建数据记录
            batchFns.push(_this.createGoodPic(pic));
          }
        });

        // 如果没有任何图片操作就返回
        if (batchFns.length === 0) {
          return resolve(info);
        }

        // 批量执行所有操作
        Promise.all(batchFns)
          .then(function() {
            resolve(info);
          })
          .catch(function(error) {
            if (error) return reject(error);
          });
      } catch (error) {
        reject('获取商品图片列表失败');
      }
    });
  };

  /**
   * 创建商品参数
   *
   * @param  {[type]} goodAttribute 参数
   */
  createGoodAttribute(goodAttribute) {
    const ctx = this.ctx;
    return new Promise(function(resolve, reject) {
      try {
        const newAttr = ctx.service.dao.index.create('GoodAttributeModel', goodAttribute);
        resolve(newAttr);
      } catch (error) {
        reject('创建商品参数失败');
      }
    });
  }

  /**
   * 更新商品属性
   *
   * @param  {[type]} info 参数
   * @param  {[type]} good 商品对象
   */
  doUpdateGoodAttributes = info => {
    const ctx = this.ctx;
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this: any = this;
    return new Promise(async function(resolve, reject) {
      const good = info.good;
      if (!good.goods_id) return reject('获取商品图片必须先获取商品信息');
      if (!info.attrs) return resolve(info);
      // var GoodAttributeModel = dao.getModel("GoodAttributeModel");
      try {
        await ctx.service.dao.goodAttributeDAO.clearGoodAttributes(good.goods_id);
        const newAttrs = info.attrs ? info.attrs : [];
        const createFns: any[] = [];
        if (newAttrs) {
          _(newAttrs).forEach(function(newattr: any) {
            newattr.goods_id = good.goods_id;
            if (newattr.attr_value) {
              if (newattr.attr_value instanceof Array) {
                newattr.attr_value = newattr.attr_value.join(',');
              } else {
                // eslint-disable-next-line no-self-assign
                newattr.attr_value = newattr.attr_value;
              }
            } else newattr.attr_value = '';
            createFns.push(_this.createGoodAttribute(_.clone(newattr)));
          });
        }
        if (createFns.length === 0) return resolve(info);
        Promise.all(createFns)
          .then(function() {
            resolve(info);
          })
          .catch(function(error) {
            if (error) return reject(error);
          });
      } catch (error) {
        return '清理原始的商品参数失败';
      }
    });
  };

  /**
   * 挂载图片
   *
   * @param  {[type]} info [description]
   * @return {[type]}      [description]
   */
  doGetAllPics = info => {
    const ctx = this.ctx;
    const { upload_config } = this.config;
    return new Promise(async function(resolve, reject) {
      const good = info.good;
      if (!good.goods_id) return reject('获取商品图片必须先获取商品信息');
      // 3. 组装最新的数据挂载在“info”中“good”对象下
      try {
        const goodPics = await ctx.service.dao.index.list('GoodPicModel', {
          where: { goods_id: good.goods_id },
        });
        const data = goodPics.map(function(pic) {
          // == 0  开通是http
          if (pic.pics_big.indexOf('http') === 0) {
            pic.pics_big_url = pic.pics_big;
          } else {
            pic.pics_big_url = upload_config.baseURL + pic.pics_big;
          }
          if (pic.pics_mid.indexOf('http') === 0) {
            pic.pics_mid_url = pic.pics_mid;
          } else {
            pic.pics_mid_url = upload_config.baseURL + pic.pics_mid;
          }
          if (pic.pics_sma.indexOf('http') === 0) {
            pic.pics_sma_url = pic.pics_sma;
          } else {
            pic.pics_sma_url = upload_config.baseURL + pic.pics_sma;
          }
          // pic.pics_mid_url = upload_config.get("baseURL") + pic.pics_mid;
          // pic.pics_sma_url = upload_config.get("baseURL") + pic.pics_sma;
          return (pic = {
            goods_id: pic.goods_id,
            pics_id: pic.pics_id,
            pics_big_url: pic.pics_big_url,
            pics_mid_url: pic.pics_mid_url,
            pics_sma_url: pic.pics_sma_url,
          });
        });
        info.good.pics = data;
        resolve(info);
      } catch (error) {
        return '获取所有商品图片列表失败';
      }
    });
  };

  /**
   * 挂载属性
   * @param  {[type]} info [description]
   * @return {[type]}      [description]
   */
  doGetAllAttrs = info => {
    const ctx = this.ctx;
    return new Promise(async function(resolve, reject) {
      const good = info.good;
      if (!good.goods_id) return reject('获取商品图片必须先获取商品信息');
      try {
        const goodAttrs = await ctx.service.dao.goodAttributeDAO.list(good.goods_id);
        info.good.attrs = goodAttrs;
        resolve(info);
      } catch (error) {
        reject('获取所有商品参数列表失败1');
      }
    });
  };

  /**
   * 创建商品
   *
   * @param  {[type]}   params 商品参数
   */
  async createGood(params) {
    // 验证参数 & 生成数据
    try {
      const info: any = await this.generateGoodInfo(params)
        // 检查商品名称
        .then(this.checkGoodName)
        // 创建商品
        .then(this.createGoodInfo)
        // 更新商品图片
        .then(this.doUpdateGoodPics)
        // 更新商品参数
        .then(this.doUpdateGoodAttributes)
        // 挂载图片
        .then(this.doGetAllPics)
        // 挂载属性
        .then(this.doGetAllAttrs);

      return info.goods;
    } catch (error) {
      return error;
    }
  }

  /**
   * 删除商品
   *
   * @param  {[type]}   id 商品ID
   */
  deleteGood(id) {
    const ctx = this.ctx;
    return ctx.service.dao.index.update('GoodModel', id, {
      is_del: '1',
      delete_time: Date.parse(new Date().toString()) / 1000,
      upd_time: Date.parse(new Date().toString()) / 1000,
    });
  }

  /**
   * 获取商品列表
   *
   * @param  {[type]}   params     查询条件
   */
  getAllGoods(params) {
    let conditions: any = {};
    if (!params.current || params.current <= 0) return 'current 参数错误';
    if (!params.pageSize || params.pageSize <= 0) return 'pageSize 参数错误';
    conditions = {
      is_del: '0',
    };
    if (params.query) {
      conditions.goods_name = {
        [Op.like]: `%${params.query}%`,
      };
    }
    const attributes = [
      'goods_id',
      'goods_name',
      'goods_price',
      'goods_weight',
      'goods_state',
      'add_time',
      'goods_number',
      'upd_time',
      'hot_mumber',
      'is_promote',
    ];
    const { current, pageSize } = params;

    return this.ctx.service.dao.index.findAndCountAll(
      'GoodModel',
      { where: conditions, attributes, order: [[ 'add_time', 'DESC' ]] },
      current,
      pageSize,
    );
  }

  /**
   * 更新商品
   *
   * @param  {[type]}   id     商品ID
   * @param  {[type]}   params 参数
   */
  async updateGood(id, params) {
    params.goods_id = id;
    // 验证参数 & 生成数据
    try {
      const info: any = await this.generateGoodInfo(params)
        // 检查商品名称
        .then(this.checkGoodName)
        // 创建商品
        .then(this.updateGoodInfo)
        // // 更新商品图片
        .then(this.doUpdateGoodPics) // doUpdateGoodPics
        // // 更新商品参数
        .then(this.doUpdateGoodAttributes)
        // 挂载图片
        .then(this.doGetAllPics)
        // 挂载属性
        .then(this.doGetAllAttrs);
      return info.good;
    } catch (error) {
      return error;
    }
  }

  // /**
  //  * 更新商品图片
  //  *
  //  * @param  {[type]}   goods_id 商品ID
  //  * @param  {[type]}   pics     商品图片
  //  * @param  {Function} cb       回调函数
  //  */
  // // module.exports.updateGoodPics = function (goods_id, pics, cb) {
  // //   if (!goods_id) return cb('商品ID不能为空')
  // //   if (isNaN(goods_id)) return cb('商品ID必须为数字')
  // //   getGoodInfo({ goods_id: goods_id, pics: pics })
  // //     .then(doUpdateGoodPics)
  // //     .then(doGetAllPics)
  // //     .then(doGetAllAttrs)
  // //     .then(function (info) {
  // //       cb(null, info.good)
  // //     })
  // //     .catch(function (err) {
  // //       cb(err)
  // //     })
  // // }
  // // module.exports.updateGoodAttributes = function (goods_id, attrs, cb) {
  // //   getGoodInfo({ goods_id: goods_id, attrs: attrs })
  // //     .then(doUpdateGoodAttributes)
  // //     .then(doGetAllPics)
  // //     .then(doGetAllAttrs)
  // //     .then(function (info) {
  // //       cb(null, info.good)
  // //     })
  // //     .catch(function (err) {
  // //       cb(err)
  // //     })
  // // }
  // // module.exports.updateGoodsState = function (goods_id, state, cb) {
  // //   getGoodInfo({ goods_id: goods_id, goods_state: state })
  // //     .then(updateGoodInfo)
  // //     .then(doGetAllPics)
  // //     .then(doGetAllAttrs)
  // //     .then(function (info) {
  // //       cb(null, info.good)
  // //     })
  // //     .catch(function (err) {
  // //       cb(err)
  // //     })
  // // }

  /**
   * 通过商品ID获取商品数据
   *
   * @param  {[type]}   id 商品ID
   */
  async getGoodById(id) {
    try {
      const info: any = await this.getGoodInfo({ goods_id: id })
        // 挂载图片
        .then(this.doGetAllPics)
        // 挂载属性
        .then(this.doGetAllAttrs);
      return info.good;
    } catch (error) {
      return error;
    }
  }
}

module.exports = GoodService;
