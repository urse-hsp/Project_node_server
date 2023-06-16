const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  // res.render用来渲染模板文件
  // res.render('index', { title: 'Express' });

  // res.send()和res.end(原生)用法基本一致,不过省去了请求头的字符集已经状态码等问题
  // res.send('respond with a resource');
  res.send('respond with a resource')

  // 返回json格式
  // res.json('respond with a resource2')
})

module.exports = router

// const userController = require('../controllers/user')
// // 获取用户信息
// router.get('/get_user', userController.showUser)
