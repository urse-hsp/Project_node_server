const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser') // 方便操作客户端中的cookie值。
const morgan = require('morgan')
const logger = require('./logger')

const JwtUtil = require('./utils/jwt')

const indexRouter = require('./routes/index')
const apiRouter = require('./routes/api/index')
const apiLogin = require('./routes/api/login')

const app = express()

// // view engine setup 视图引擎设置
// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'jade')

app.use(morgan('dev'))
app.use(express.json()) // 解析参数
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser()) // 解析 方便操作客户端中的cookie值。

// 利用 Express 托管静态文件
app.use(express.static(path.join(__dirname, 'public'))) //
app.use('/', express.static(path.join(__dirname, 'public/login'))) // 可以通过带有 /static 前缀地址来访问 public 目录中的文件了。
// // 俩后台管理项目启动必须放到路由根路径
// app.use('/vue', express.static(path.join(__dirname, 'public/vue-admin')))
// app.use('/react', express.static(path.join(__dirname, 'public/react-admin')))

// 设置跨域和相应数据格式
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*') // 跨域
  res.header('Access-Control-Allow-Headers', 'X-Requested-With') // 请求头中设置允许的请求方法。
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization')
  res.setHeader('Content-Type', 'application/json; charset=utf-8') // 使用Content-Type来表示具体请求中的媒体类型信息
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, token')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS') // 允许访问的方法
  res.header('X-Powered-By', ' 3.2.1')
  if (req.method == 'OPTIONS') res.send(200)
  /*让options请求快速返回*/ else next()
})

// token权限验证
app.use(function (req, res, next) {
  // 这里知识把登陆和注册请求去掉了，其他的多有请求都需要进行token校验
  if (req.url != '/api/login' && req.url != '/test/:data') {
    let jwt = new JwtUtil(req.headers.token)
    let result = jwt.verifyToken()
    // 如果考验通过就next，否则就返回登陆信息不正确
    if (result == 'err') {
      console.log(result)
      res.send({ success: false, msg: '登录已过期,请重新登录' })
      // res.render('login.html');
    } else next()
  } else next()
})

// 初始化统一响应机制
const resextra = require('./utils/resextra')
app.use(resextra)

app.use('/', indexRouter)
app.use('/api', apiRouter)
app.use('/api', apiLogin)

// catch 404 and forward to error handler  捕获404并转发到错误处理程序
app.use(function (req, res, next) {
  next(createError(404))
})

//  默认的错误处理
//error handler
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
