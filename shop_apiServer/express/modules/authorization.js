const path = require('path')
global.service_caches = {}

// 获取角色服务模块
var roleService = require(path.join(process.cwd(), 'services/RoleService'))

const service_auth_fn = function (req, res, next, serviceName, actionName, passFn) {
  if (!req.userInfo || isNaN(parseInt(req.userInfo.rid))) return res.sendResult('无角色ID分配')
  // 验证权限
  roleService.authRight(req.userInfo.rid, serviceName, actionName, function (err, pass) {
    passFn(pass)
  })
}

// 存储全局验证函数
global.service_auth_fn = null

/**
 * 构造回调对象格式
 *
 * @param {[type]} serviceName   服务名称
 * @param {[type]} actionName    动作名称（方法名）
 * @param {[type]} serviceModule 服务模块
 * @param {[type]} origFunc      原始方法
 */
function Invocation(serviceName, actionName, serviceModule, origFunc) {
  return function () {
    const origArguments = arguments
    return function (req, res, next) {
      if (global.service_auth_fn) {
        service_auth_fn(req, res, next, serviceName, actionName, function (pass) {
          if (pass) {
            origFunc.apply(serviceModule, origArguments)
          } else {
            res.sendResult(null, 401, '权限验证失败')
          }
        })
      } else {
        res.sendResult(null, 401, '权限验证失败')
      }
    }
  }
}

// 获取服务对象
module.exports.getService = function (serviceName) {
  if (global.service_caches[serviceName]) {
    return global.service_caches[serviceName]
  }
  const servicePath = path.join(process.cwd(), 'services', serviceName)

  const serviceModule = require(servicePath)
  if (!serviceModule) {
    console.log('模块没有被发现')
    return null
  }
  global.service_caches[serviceName] = {}

  console.log('*****************************************')
  console.log('拦截服务 => %s', serviceName)
  console.log('*****************************************')
  for (index in serviceModule) {
    if (serviceModule && serviceModule[index] && typeof serviceModule[index] == 'function') {
      const origFunc = serviceModule[index]
      global.service_caches[serviceName][index] = Invocation(serviceName, index, serviceModule, origFunc)
      console.log('action => %s', index, 66)
    }
  }
  console.log('*****************************************\n')

  return global.service_caches[serviceName]
}

// 设置全局验证函数
module.exports.setAuthFn = function (authFn = service_auth_fn) {
  global.service_auth_fn = authFn
}
