const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const logger = require('./config/logger')
const mount = require('mount-routes') // 路由加载

const app = express()

// 初始化数据库模块
const { initialize } = require('./modules/database')
app.use(initialize)

/**
 *	后台管理系统初始化
 */

// 获取管理员逻辑模块
const managerService = require('./services/ManagerService')
// 获取角色服务模块
var roleService = require(path.join(process.cwd(), 'services/RoleService'))

//  view engine setup
// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'jade')

app.use(morgan('dev'))
app.use(express.json()) // 解析参数
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser()) // 解析 方便操作客户端中的cookie值。

app.use(express.static(path.join(__dirname, 'public'))) // 托管静态文件
app.use('/', express.static(path.join(__dirname, 'public/vueAdmin'))) // 可以通过带有 /static 前缀地址来访问 public 目录中的文件了。

// 设置跨域和相应数据格式  /api/*
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*') // 跨域
  res.header('Access-Control-Allow-Headers', 'X-Requested-With') // 请求头中设置允许的请求方法。
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization')
  res.setHeader('Content-Type', 'application/json; charset=utf-8') // 使用Content-Type来表示具体请求中的媒体类型信息
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, token')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS') // 允许访问的方法
  res.header('X-Powered-By', ' 3.2.1')
  if (req.method == 'OPTIONS') res.send(200)
  else next()
  /*让options请求快速返回*/
})

// 初始化统一响应机制
const resextra = require('./modules/resextra')
app.use(resextra)

// 初始化 passport 框架
const { setup, tokenAuth, login } = require('./modules/passport')
setup(app, managerService.login)
app.use('/api/private/v1/login', login) // 登录接口
app.use('/*', tokenAuth) // token权限验证

const logistics = require('./modules/Logistics.js')
app.get('/api/private/v1/kuaidi/:orderno', logistics.getLogisticsInfo)


// 获取验证模块
// const authorization = require(path.join(process.cwd(), '/modules/authorization'))
// // 设置全局权限
// authorization.setAuthFn(function (req, res, next, serviceName, actionName, passFn) {
//   if (!req.userInfo || isNaN(parseInt(req.userInfo.rid))) return res.sendResult('无角色ID分配')
//   // 验证权限
//   roleService.authRight(req.userInfo.rid, serviceName, actionName, function (err, pass) {
//     passFn(pass)
//   })
// })

/**
 * 初始化路由
 * 带路径的用法并且可以打印出路有表
 */
mount(app, path.join(process.cwd(), '/routes'), true)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

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
