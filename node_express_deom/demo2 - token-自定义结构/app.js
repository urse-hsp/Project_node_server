const express = require('express')
const app = express()
const cors = require('cors')
const { json, urlencoded } = require('body-parser') // 解析参数

const indexRouter = require('./routes/index')
const apiRouter = require('./routes/api/index')
const apiLogin = require('./routes/api/login')

app.use(cors()) // 解决跨域
app.use(json()) // json请求
app.use(urlencoded({ extended: false })) // 表单请求

app.listen(8888, () => console.log('启动服务'))

// app.all方法，这个方法支持所有请求方式，不必每个  请求都写好几遍了。
// 方法有三个返回值。第一个是传过来的。第二个是以什么形式返回 json等格式。第三个是继续执行下去

// 设置跨域和相应数据格式
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*') // 跨域
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, mytoken') // 请求头中设置允许的请求方法。
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization')
  res.setHeader('Content-Type', 'application/json; charset=utf-8') // 使用Content-Type来表示具体请求中的媒体类型信息
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept,X-Requested-With')
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
      res.send({ status: 403, msg: '登录已过期,请重新登录' })
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
