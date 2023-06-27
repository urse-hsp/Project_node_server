const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const logger = require('./config/logger')
const passport = require('passport')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
require('./models')


const app = express()

// 初始化数据库模块
const { initialize } = require('./modules/database')
app.use(initialize)

/**
 *
 *	后台管理系统初始化
 *
 */
// 获取管理员逻辑模块
const managerService = require(path.join(process.cwd(), 'services/ManagerService'))

// // view engine setup
// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'jade')

app.use(morgan('dev'))
app.use(express.json()) // 解析参数
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser()) // 解析 方便操作客户端中的cookie值。

app.use(express.static(path.join(__dirname, 'public'))) // 托管静态文件
app.use('/', express.static(path.join(__dirname, 'public/vueAdmin'))) // 可以通过带有 /static 前缀地址来访问 public 目录中的文件了。

// 初始化数据库模块
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

// 初始化统一响应机制
const resextra = require('./modules/resextra')
app.use(resextra)

// // token权限验证
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
const { login: login2 } = require('./services/ManagerService')

app.use(passport.initialize())
// 初始化数据库模块
const { setup, tokenAuth, login } = require('./modules/passport')
setup(app, login2)

app.use('/login', login)

// 设置 passport 验证路径
// app.use('/*', tokenAuth)

app.use('/', indexRouter)
// app.use('/users', usersRouter)
// app.use('/api', usersRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// //  默认的错误处理
// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message
//   res.locals.error = req.app.get('env') === 'development' ? err : {}

//   // render the error page
//   res.status(err.status || 500)
//   res.render('error')
// })
/**
 * error handler
 * @private
 */
// 处理非404的错误（throw 出来的错误)
const _errorHandler = (err, req, res, next) => {
  logger.error(`${req.method} ${req.originalUrl} ` + err.message)
  const errorMsg = err.message
  res.status(err.status || 500).json({
    code: -1,
    success: false,
    message: errorMsg,
    data: {},
  })
}
app.use(_errorHandler)

module.exports = app
