var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json()) // 解析参数
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser()) // 解析 方便操作客户端中的cookie值。
app.use(express.static(path.join(__dirname, 'public'))) // 托管静态文件

// // 初始化数据库模块
// const database = require('./modules/database')
// database.initialize(app, function (err) {
//   if (err) console.error('连接数据库失败失败 %s', err)
// })

// 设置跨域和相应数据格式  /api/*
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*') // 跨域
  res.header('Access-Control-Allow-Headers', 'X-Requested-With') // 请求头中设置允许的请求方法。
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization')
  res.setHeader('Content-Type', 'application/json;charset=utf-8') // 使用Content-Type来表示具体请求中的媒体类型信息
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With', 'token')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS') // 允许访问的方法
  res.header('X-Powered-By', ' 3.2.1')
  if (req.method == 'OPTIONS') res.send(200)
  else next()
  /*让options请求快速返回*/
})

// token权限验证
// app.use(function (req, res, next) {
//   // 这里知识把登陆和注册请求去掉了，其他的多有请求都需要进行token校验
//   if (req.url != '/api/login' && req.url != '/test/:data') {
//     let jwt = new JwtUtil(req.headers.token)
//     let result = jwt.verifyToken()
//     // 如果考验通过就next，否则就返回登陆信息不正确
//     if (result == 'err') {
//       console.log(result)
//       res.send({ success: false, msg: '登录已过期,请重新登录' })
//       // res.render('login.html');
//     } else next()
//   } else next()
// })
// 获取验证模块
// var authorization = require(path.join(process.cwd(), '/modules/authorization'))
// // 设置全局权限
// authorization.setAuthFn(function(req, res, next, serviceName, actionName, passFn) {
//   if (!req.userInfo || isNaN(parseInt(req.userInfo.rid))) return res.sendResult('无角色ID分配')
//   // 验证权限
//   roleService.authRight(req.userInfo.rid, serviceName, actionName, function(err, pass) {
//     passFn(pass)
//   })
// })


// 初始化统一响应机制
const resextra = require('./modules/resextra')
app.use(resextra)

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/api', usersRouter)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
