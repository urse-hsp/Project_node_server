const _ = require('lodash')
const path = require('path')
const dao = require(path.join(process.cwd(), 'dao/DAO'))
const goodAttributeDao = require(path.join(process.cwd(), 'dao/GoodAttributeDAO'))
const fs = require('fs')

// const gm = require('gm')
// const uniqid = require('uniqid')
// const Promise = require('bluebird')

const upload_config = require('../config/default.json').upload_config

const Sequelize = require('sequelize')
const Op = Sequelize.Op

/**
 * 裁剪图片
 *
 * @param  {[type]} srcPath   原始图片路径
 * @param  {[type]} savePath  存储路径
 * @param  {[type]} newWidth  新的宽度
 * @param  {[type]} newHeight 新的高度
 * @return {[type]}           [description]
 */
function clipImage(srcPath, savePath, newWidth, newHeight) {
  return new Promise(function (resolve, reject) {
    // console.log("src => %s",srcPath);
    // console.log("save => %s",savePath);
    /*
		gm(srcPath)
		.resize(newWidth,newHeight)
		.autoOrient()
		.write(savePath,function(err){
			resolve();
		})

		*/

    // 创建读取流
    readable = fs.createReadStream(srcPath)
    // 创建写入流
    writable = fs.createWriteStream(savePath)
    readable.pipe(writable)
    readable.on('end', function () {
      resolve()
    })
  })
}

/**
 * 通过参数生成产品基本信息
 *
 * @param  {[type]} params.cb [description]
 * @return {[type]}           [description]
 */
function generateGoodInfo(params) {
  return new Promise(function (resolve, reject) {
    var info = {}
    if (params.goods_id) info['goods_id'] = params.goods_id
    if (!params.goods_name) return reject('商品名称不能为空')
    info['goods_name'] = params.goods_name

    if (!params.goods_price) return reject('商品价格不能为空')
    var price = parseFloat(params.goods_price)
    if (isNaN(price) || price < 0) return reject('商品价格不正确')
    info['goods_price'] = price

    if (!params.goods_number) return reject('商品数量不能为空')
    var num = parseInt(params.goods_number)
    if (isNaN(num) || num < 0) return reject('商品数量不正确')
    info['goods_number'] = num

    if (!params.goods_cat) return reject('商品没有设置所属分类')
    var cats = params.goods_cat.split(',')
    if (cats.length > 0) {
      info['cat_one_id'] = cats[0]
    }
    if (cats.length > 1) {
      info['cat_two_id'] = cats[1]
    }
    if (cats.length > 2) {
      info['cat_three_id'] = cats[2]
      info['cat_id'] = cats[2]
    }

    if (params.goods_weight) {
      weight = parseFloat(params.goods_weight)
      if (isNaN(weight) || weight < 0) return reject('商品重量格式不正确')
      info['goods_weight'] = weight
    } else {
      info['goods_weight'] = 0
    }
    if (params.goods_introduce) {
      info['goods_introduce'] = params.goods_introduce
    }

    if (params.goods_big_logo) {
      info['goods_big_logo'] = params.goods_big_logo
    } else {
      info['goods_big_logo'] = ''
    }

    if (params.goods_small_logo) {
      info['goods_small_logo'] = params.goods_small_logo
    } else {
      info['goods_small_logo'] = ''
    }

    if (params.goods_state) {
      info['goods_state'] = params.goods_state
    }

    // 图片
    if (params.pics) {
      info['pics'] = params.pics
    }

    // 属性
    if (params.attrs) {
      info['attrs'] = params.attrs
    }

    info['add_time'] = Date.parse(new Date()) / 1000
    info['upd_time'] = Date.parse(new Date()) / 1000
    info['is_del'] = '0'

    if (params.hot_mumber) {
      hot_num = parseInt(params.hot_mumber)
      if (isNaN(hot_num) || hot_num < 0) return reject('热销品数量格式不正确')
      info['hot_mumber'] = hot_num
    } else {
      info['hot_mumber'] = 0
    }

    info['is_promote'] = info['is_promote'] ? info['is_promote'] : false

    resolve(info)
  })
}

/**
 * 检查商品名称是否重复
 *
 * @param  {[type]} info [description]
 * @return {[type]}      [description]
 */
function checkGoodName(info) {
  return new Promise(function (resolve, reject) {
    dao.findOne('GoodModel', { goods_name: info.goods_name, is_del: '0' }, function (err, good) {
      if (err) return reject(err)
      if (!good) return resolve(info)
      if (good.goods_id == info.goods_id) return resolve(info)
      return reject('商品名称已存在')
    })
  })
}

/**
 * 创建商品基本信息
 *
 * @param  {[type]} info [description]
 * @return {[type]}      [description]
 */
function createGoodInfo(info) {
  return new Promise(function (resolve, reject) {
    dao.create('GoodModel', _.clone(info), function (err, newGood) {
      if (err) return reject('创建商品基本信息失败')
      newGood.goods_cat = newGood.cat_one_id + ',' + newGood.cat_two_id + ',' + newGood.cat_three_id
      info.good = newGood
      return resolve(info)
    })
  })
}

/**
 * 更新产品/修改
 *
 * @param  {[type]} info [description]
 */
function updateGoodInfo(info) {
  return new Promise(function (resolve, reject) {
    if (!info.goods_id) return reject('商品ID不存在')
    dao.update('GoodModel', info.goods_id, _.clone(info), function (err, newGood) {
      if (err) return reject('更新商品基本信息失败')
      info.good = newGood
      return resolve(info)
    })
  })
}

/**
 * 获取商品对象
 *
 * @param  {[type]} info 查询内容
 * @return {[type]}      [description]
 */
function getGoodInfo(info) {
  return new Promise(function (resolve, reject) {
    if (!info || !info.goods_id || isNaN(info.goods_id)) return reject('商品ID格式不正确')

    dao.findByPk('GoodModel', info.goods_id, function (err, good) {
      if (err) return reject('获取商品基本信息失败')
      good.get('', { plain: true })
      info['good'] = {
        ...good.dataValues,
        goods_cat: good.cat_one_id + ',' + good.cat_two_id + ',' + good.cat_three_id,
      }
      return resolve(info)
    })
  })
}

/**
 * 删除商品图片
 *
 * @param  {[type]} pic 图片对象
 * @return {[type]}     [description]
 */
function removeGoodPic(pic) {
  console.log(pic, '666')
  return new Promise(function (resolve, reject) {
    // if (!pic || !pic.remove) return reject('删除商品图片记录失败')
    // pic.remove(function (err) {
    //   if (err) return reject('删除失败')
    //   resolve()
    // })

    dao.destroy('GoodPicModel', pic.pics_id, function (err) {
      if (err) return reject('删除商品图片记录失败')
      resolve()
    })
  })
}

function removeGoodPicFile(path) {
  return new Promise(function (resolve, reject) {
    fs.unlink(path, function (err, result) {
      resolve()
    })
  })
}

// 创建 GoodPic
function createGoodPic(pic) {
  return new Promise(function (resolve, reject) {
    if (!pic) return reject('图片对象不能为空')
    dao.create('GoodPicModel', pic, function (err, newPic) {
      if (err) return reject('创建图片数据失败')
      resolve(newPic)
    })
  })
}

/**
 * 更新商品图片
 *
 * @param  {[type]} info    参数
 * @param  {[type]} newGood 商品基本信息
 */
function doUpdateGoodPics(info, isAdd = false) {
  return new Promise(function (resolve, reject) {
    var good = info.good
    if (!good.goods_id) return reject('更新商品图片失败')

    if (!info.pics) return resolve(info)
    dao.list('GoodPicModel', { where: { goods_id: good.goods_id } }, function (err, oldpics) {
      if (err) return reject('获取商品图片列表失败')

      var batchFns = []
      var newpics = info.pics ? info.pics : []
      var newpicsKV = _.keyBy(newpics, 'pics_id')

      /**
       * 保存图片集合
       */
      // 需要新建的图片集合
      var addNewpics = []
      // 需要保留的图片的集合
      var reservedOldpics = []
      // 需要删除的图片集合
      var delOldpics = []

      // 如果提交的新的数据中有老的数据的pics_id就说明保留数据，否则就删除
      _(oldpics).forEach(function (pic) {
        if (newpicsKV[pic.pics_id]) {
          reservedOldpics.push(pic)
        } else {
          delOldpics.push(pic)
        }
      })

      // 从新提交的数据中检索出需要新创建的数据
      // 计算逻辑如果提交的数据不存在 pics_id 字段说明是新创建的数据
      _(newpics).forEach(function (pic) {
        if (!pic.pics_id && pic.pic) {
          addNewpics.push(pic)
        }
      })

      // 开始处理商品图片数据逻辑
      // 1. 删除商品图片数据集合
      _(delOldpics).forEach(function (pic) {
        // 1.1 删除图片物理路径
        batchFns.push(removeGoodPicFile(path.join(process.cwd(), pic.pics_big)))
        batchFns.push(removeGoodPicFile(path.join(process.cwd(), pic.pics_mid)))
        batchFns.push(removeGoodPicFile(path.join(process.cwd(), pic.pics_sma)))
        // 1.2 数据库中删除图片数据记录
        batchFns.push(removeGoodPic(pic))
      })

      // 2. 处理新建图片的集合
      _(addNewpics).forEach(function (pic) {
        if (!pic.pics_id && pic.pic) {
          // 2.1 通过原始图片路径裁剪出需要的图片
          var src = path.join(process.cwd(), pic.pic)
          var tmp = src.split(path.sep)
          var filename = tmp[tmp.length - 1]
          pic.pics_big = upload_config.upload_path + '/big_' + filename // big_
          pic.pics_mid = upload_config.upload_path + '/mid_' + filename
          pic.pics_sma = upload_config.upload_path + '/sma_' + filename
          batchFns.push(clipImage(src, path.join(process.cwd(), pic.pics_big), 800, 800))
          batchFns.push(clipImage(src, path.join(process.cwd(), pic.pics_mid), 400, 400))
          batchFns.push(clipImage(src, path.join(process.cwd(), pic.pics_sma), 200, 200))
          pic.goods_id = good.goods_id
          // 2.2 数据库中新建数据记录
          batchFns.push(createGoodPic(pic))
        }
      })

      // 如果没有任何图片操作就返回
      if (batchFns.length == 0) {
        return resolve(info)
      }

      // 批量执行所有操作
      Promise.all(batchFns)
        .then(function () {
          resolve(info)
        })
        .catch(function (error) {
          if (error) return reject(error)
        })
    })
  })
}

function addDoUpdateGoodPics(info) {
  return doUpdateGoodPics(info, true)
}

/**
 * 创建商品参数
 *
 * @param  {[type]} goodAttribute 参数
 */
function createGoodAttribute(goodAttribute) {
  return new Promise(function (resolve, reject) {
    dao.create('GoodAttributeModel', goodAttribute, function (err, newAttr) {
      if (err) return reject('创建商品参数失败')
      resolve(newAttr)
    })
  })
}

/**
 * 更新商品属性
 *
 * @param  {[type]} info 参数
 * @param  {[type]} good 商品对象
 */
function doUpdateGoodAttributes(info) {
  return new Promise(function (resolve, reject) {
    var good = info.good
    if (!good.goods_id) return reject('获取商品图片必须先获取商品信息')
    if (!info.attrs) return resolve(info)
    // var GoodAttributeModel = dao.getModel("GoodAttributeModel");
    goodAttributeDao.clearGoodAttributes(good.goods_id, function (err) {
      if (err) return reject('清理原始的商品参数失败')

      var newAttrs = info.attrs ? info.attrs : []
      var createFns = []
      if (newAttrs) {
        _(newAttrs).forEach(function (newattr) {
          newattr.goods_id = good.goods_id
          if (newattr.attr_value) {
            if (newattr.attr_value instanceof Array) {
              newattr.attr_value = newattr.attr_value.join(',')
            } else {
              newattr.attr_value = newattr.attr_value
            }
          } else newattr.attr_value = ''
          createFns.push(createGoodAttribute(_.clone(newattr)))
        })
      }

      if (createFns.length == 0) return resolve(info)

      Promise.all(createFns)
        .then(function () {
          resolve(info)
        })
        .catch(function (error) {
          if (error) return reject(error)
        })
    })
  })
}

/**
 * 挂载图片
 *
 * @param  {[type]} info [description]
 * @return {[type]}      [description]
 */
function doGetAllPics(info) {
  return new Promise(function (resolve, reject) {
    var good = info.good
    if (!good.goods_id) return reject('获取商品图片必须先获取商品信息')
    // 3. 组装最新的数据挂载在“info”中“good”对象下
    dao.list('GoodPicModel', { where: { goods_id: good.goods_id } }, function (err, goodPics) {
      if (err) return reject('获取所有商品图片列表失败')
      const data = goodPics.map(function (pic) {
        // == 0  开通是http
        if (pic.pics_big.indexOf('http') == 0) {
          pic.pics_big_url = pic.pics_big
        } else {
          pic.pics_big_url = upload_config.baseURL + pic.pics_big
        }

        if (pic.pics_mid.indexOf('http') == 0) {
          pic.pics_mid_url = pic.pics_mid
        } else {
          pic.pics_mid_url = upload_config.baseURL + pic.pics_mid
        }
        if (pic.pics_sma.indexOf('http') == 0) {
          pic.pics_sma_url = pic.pics_sma
        } else {
          pic.pics_sma_url = upload_config.baseURL + pic.pics_sma
        }

        // pic.pics_mid_url = upload_config.get("baseURL") + pic.pics_mid;
        // pic.pics_sma_url = upload_config.get("baseURL") + pic.pics_sma;
        return (pic = {
          goods_id: pic.goods_id,
          pics_id: pic.pics_id,
          pics_big_url: pic.pics_big_url,
          pics_mid_url: pic.pics_mid_url,
          pics_sma_url: pic.pics_sma_url,
        })
      })
      info.good.pics = data
      resolve(info)
    })
  })
}

/**
 * 挂载属性
 * @param  {[type]} info [description]
 * @return {[type]}      [description]
 */
function doGetAllAttrs(info) {
  return new Promise(function (resolve, reject) {
    var good = info.good
    if (!good.goods_id) return reject('获取商品图片必须先获取商品信息')
    goodAttributeDao.list(good.goods_id, function (err, goodAttrs) {
      if (err) return reject('获取所有商品参数列表失败')
      info.good.attrs = goodAttrs
      resolve(info)
    })
  })
}

/**
 * 创建商品
 *
 * @param  {[type]}   params 商品参数
 * @param  {Function} cb     回调函数
 */
module.exports.createGood = function (params, cb) {
  // 验证参数 & 生成数据
  generateGoodInfo(params)
    // 检查商品名称
    .then(checkGoodName)
    // 创建商品
    .then(createGoodInfo)
    // 更新商品图片
    .then(addDoUpdateGoodPics)
    // 更新商品参数
    .then(doUpdateGoodAttributes)
    // 挂载图片
    .then(doGetAllPics)
    // 挂载属性
    .then(doGetAllAttrs)
    // 创建成功
    .then(function (info) {
      cb(null, info.good)
    })
    .catch(function (err) {
      cb(err)
    })
}

/**
 * 删除商品
 *
 * @param  {[type]}   id 商品ID
 * @param  {Function} cb 回调函数
 */
module.exports.deleteGood = function (id, cb) {
  if (!id) return cb('产品ID不能为空')
  if (isNaN(id)) return cb('产品ID必须为数字')
  dao.update(
    'GoodModel',
    id,
    {
      is_del: '1',
      delete_time: Date.parse(new Date()) / 1000,
      upd_time: Date.parse(new Date()) / 1000,
    },
    function (err) {
      if (err) return cb(err)
      cb(null)
    },
    'goods_id'
  )
}

/**
 * 获取商品列表
 *
 * @param  {[type]}   params     查询条件
 * @param  {Function} cb         回调函数
 */
module.exports.getAllGoods = function (params, cb) {
  var conditions = {}
  if (!params.current || params.current <= 0) return cb('current 参数错误')
  if (!params.pageSize || params.pageSize <= 0) return cb('pageSize 参数错误')

  conditions = {
    is_del: '0',
  }
  if (params.query) {
    conditions.goods_name = {
      [Op.like]: `%${params.query}%`,
    }
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
  ]
  const { current, pageSize } = params
  dao.findAndCountAll('GoodModel', { where: conditions, attributes, order: [['add_time', 'DESC']] }, current, pageSize, function (err, data) {
    if (err) return cb(err)
    // resultDta['goods'] = _.map(goods, function (good) {
    //   return _.omit(good, 'goods_introduce', 'is_del', 'goods_big_logo', 'goods_small_logo', 'delete_time')
    // })
    cb(null, data)
  })
}

/**
 * 更新商品
 *
 * @param  {[type]}   id     商品ID
 * @param  {[type]}   params 参数
 * @param  {Function} cb     回调函数
 */
module.exports.updateGood = function (id, params, cb) {
  params.goods_id = id
  // 验证参数 & 生成数据
  generateGoodInfo(params)
    // 检查商品名称
    .then(checkGoodName)
    // 创建商品
    .then(updateGoodInfo)
    // // 更新商品图片
    .then(addDoUpdateGoodPics) // doUpdateGoodPics
    // // 更新商品参数
    .then(doUpdateGoodAttributes)
    // 挂载图片
    .then(doGetAllPics)
    // 挂载属性
    .then(doGetAllAttrs)
    // 创建成功
    .then(function (info) {
      cb(null, info.good)
    })
    .catch(function (err) {
      cb(err)
    })
}

/**
 * 更新商品图片
 *
 * @param  {[type]}   goods_id 商品ID
 * @param  {[type]}   pics     商品图片
 * @param  {Function} cb       回调函数
 */
// module.exports.updateGoodPics = function (goods_id, pics, cb) {
//   if (!goods_id) return cb('商品ID不能为空')
//   if (isNaN(goods_id)) return cb('商品ID必须为数字')

//   getGoodInfo({ goods_id: goods_id, pics: pics })
//     .then(doUpdateGoodPics)
//     .then(doGetAllPics)
//     .then(doGetAllAttrs)
//     .then(function (info) {
//       cb(null, info.good)
//     })
//     .catch(function (err) {
//       cb(err)
//     })
// }

// module.exports.updateGoodAttributes = function (goods_id, attrs, cb) {
//   getGoodInfo({ goods_id: goods_id, attrs: attrs })
//     .then(doUpdateGoodAttributes)
//     .then(doGetAllPics)
//     .then(doGetAllAttrs)
//     .then(function (info) {
//       cb(null, info.good)
//     })
//     .catch(function (err) {
//       cb(err)
//     })
// }

// module.exports.updateGoodsState = function (goods_id, state, cb) {
//   getGoodInfo({ goods_id: goods_id, goods_state: state })
//     .then(updateGoodInfo)
//     .then(doGetAllPics)
//     .then(doGetAllAttrs)
//     .then(function (info) {
//       cb(null, info.good)
//     })
//     .catch(function (err) {
//       cb(err)
//     })
// }

/**
 * 通过商品ID获取商品数据
 *
 * @param  {[type]}   id 商品ID
 * @param  {Function} cb 回调函数
 */
module.exports.getGoodById = function (id, cb) {
  getGoodInfo({ goods_id: id })
    // 挂载图片
    .then(doGetAllPics)
    // 挂载属性
    // .then(doGetAllAttrs)
    .then(function (info) {
      cb(null, info.good)
    })
    .catch(function (err) {
      cb(err)
    })
}
