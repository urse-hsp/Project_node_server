var express = require('express')
var router = express.Router()
const User = require('../models/user')
const GoodModel = require('../models/GoodModel')

const { sequelize } = require('../modules/database')
var _ = require('lodash')
var path = require('path')
var dao = require(path.join(process.cwd(), 'dao/DAO'))

/* GET home page. */
router.get('/', function (req, res, next) {
  // res.render用来渲染模板文件
  // res.render('index', { title: 'Express' });

  // res.send()和res.end(原生)用法基本一致,不过省去了请求头的字符集已经状态码等问题
  res.sendResult('respond with a resource')
  // res.sendResult('respond with a resource')

  // 返回json格式
  // res.json('respond with a resource2')
})

router.get('/getlis', async (req, res, next) => {
  // user 数据，created是否是创建的
  // const [user, created] = await User.findOrCreate({
  //   where: { user_id: 1 },
  //   // defaults 参数来定义必须创建的内容
  //   defaults: {
  //     job: 'Technical Lead JavaScript',
  //     username: 1,
  //   },
  // })
  const godss = await GoodModel.findAll({ goods_name: '就这', is_del: '0' })

  res.sendResult(godss, 200, '成功')
})

module.exports = router
