# 项目整体文件说明

- `config` 配置文件目录
  - `default.json` 默认配置文件（其中包含数据库配置，jwt 配置）
- `dao` 数据访问层，存放对数据库的增删改查操作 \*\*（操作数据库的地方）
  - `DAO.js` 提供的公共访问数据库的方法
- `models` 存放具体数据库 ORM 模型文件 \*\* (数据库数据模型)
- `modules` 当前项目模块 \*\* （项目的底层功能工具）
  - `authorization.js` API 权限验证模块
  - `database.js` 数据库模块（数据库加载基于 nodejs-orm2 库加载）
  - `passport.js` 基于 passport 模块的登录搭建
  - `resextra.js` API 统一返回结果接口
- `node_modules` 项目依赖的第三方模块
- `routes` 统一路由
  - `api` 提供 api 接口
  - `mapp` 提供移动 APP 界面
  - `mweb` 提供移动 web 站点
- `services` 服务层，业务逻辑代码在这一层编写，通过不同的接口获取的数据转换成统一的前端所需要的数据
- `app.js` 主项目入口文件
- `package.json` 项目配置文件

# 插件说明

1. mysql
1. winston log 日志
1. passport NodeJS 的认证中间件
1. Passport-local 是本地策略验证模块
1. passport-http-bearer 是 Passport 提供的一个策略（strategy），用于基于 Bearer Token 的身份验证
1. orm
   Node.js ORM 框架
   https://github.com/dresende/node-orm2
1. mount-routes 可以自动挂载 routes 目录的所有路由，以文件名称作为路由的根，也可以指定具体的路径（使用第二个参数）
1. multer 实现本地文件/图片上传到服务器指定目录

# api 接口

## user

1. /api/private/v1/users 管理员列表
2. /api/private/v1/users:id 获取用户信息
3. /api/private/v1/users post 创建用户
4. /api/private/v1/users:id put 修改用户信息
5. /api/private/v1/users:id delete 删除用户信息
6. /api/private/v1/users:id/role put 分配用户角色
7. /api/private/v1/users:id/state/:state put 状态开关

## upload

1. /upload post 提供文件上传服务

## roles

1. /roles get 获取角色列表
2. /roles post 创建角色
3. /roles:id 获取用户信息
4. /roles:id delete 删除用户信息
5. /roles:id/rights put 分配用户角色
6. /roles:id/rights/:rightId delete 删除角色权限

## rights

1. /rights:type get 权限列表

## reports

1. /rights/type:typeid get 用户管理列表

## orders

1. /orders get 订单列表
   <!-- 2. /orders post 创建 -->
   <!-- 3. /orders:id put 更新订单发送状态 -->
   <!-- 4. /orders:id get 删除用户信息 -->

## menus

1. /menus get 菜单列表

## goods

1. /goods get 商品列表
2. /goods post 添加商品
3. /goods:id put 更新商品
4. /goods:id delete 删除商品
5. /goods:id/pics put 更新商品的图片
6. /goods:id/attributes delete 更新商品的属性
7. /goods:id/state/:state put 更新商品状态

## categories

1. /categories get 获取分类列表
2. /categories post 创建分类
<!-- 3. /categories get -->
3. /categories:id put 更新分类
4. /categories:id/attributes get 通过参数方式查询静态参数还是动态参数
5. /categories:id/attributes/:attrId get 获取参数 详情
6. /categories:id/attributes post 创建参数
7. /categories:id/attributes/:attrId put 更新参数
8. /categories:id/attributes/:attrId delete 删除参数

# 其他

1. /api/private/v1/login 登录

# sql

1.

# passport

初始化服务，
登录： passport-local，local 触发验证接收回调，
权限校验： passport-http-bearer，bearer 触发验证接收回调，
