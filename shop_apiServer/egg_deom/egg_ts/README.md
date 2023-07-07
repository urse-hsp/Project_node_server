# hackernews-tegg

# RESTful 表现层状态转移

1. 在 RESTful 风格的设计，通过响应状态码来标识响应的状态，保持响应的 body 简洁，只返回接口数据。
1. 设计响应格式
1. 约束前后端的通信 响应格式

# 插件

1. egg-validate 参数校验模块 参数进行检验。比如检验一个用户名是不是字符串，可以这么写，
   ctx.validate({ userName: 'string' });

#

1. Controller 框架推荐 Controller 层主要对用户的请求参数进行处理（校验、转换），然后调用对应的 service 方法处理业务，得到业务结果后封装并返回：
   获取用户通过 HTTP 传递过来的请求参数。
   校验、组装参数。
   调用 Service 进行业务处理，必要时处理转换 Service 的返回结果，让它适应用户的需求。
   通过 HTTP 将结果响应给用户。

# 请求参数

get ? 路径后面 query 
post /is/ params url 中的
post body

# 异常处理

1. 自定义统一异常处理
   https://www.eggjs.org/zh-CN/core/error-handling#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%9F%E4%B8%80%E5%BC%82%E5%B8%B8%E5%A4%84%E7%90%86

2. 自定义 404 响应
   https://www.eggjs.org/zh-CN/core/error-handling#%E8%87%AA%E5%AE%9A%E4%B9%89-404-%E5%93%8D%E5%BA%94
3. 统一错误处理 https://www.eggjs.org/zh-CN/tutorials/restful#%E7%BB%9F%E4%B8%80%E9%94%99%E8%AF%AF%E5%A4%84%E7%90%86

# CARD

1. MYSQL https://www.eggjs.org/zh-CN/tutorials/mysql#%E5%A6%82%E4%BD%95%E7%BC%96%E5%86%99-crud-%E8%AF%AD%E5%8F%A5
2. Router https://www.eggjs.org/zh-CN/basics/router#restful-%E9%A3%8E%E6%A0%BC%E7%9A%84-url-%E5%AE%9A%E4%B9%89

#

app/router.js 用于配置 URL 路由规则，具体参见 Router。
app/controller/** 用于解析用户的输入，处理后返回相应的结果，具体参见 Controller。(控制器)
app/service/** 用于编写业务逻辑层，可选，建议使用，具体参见 Service。
app/middleware/** 用于编写中间件，可选，具体参见 Middleware。
app/public/** 用于放置静态资源，可选，具体参见内置插件 egg-static。
app/extend/** 用于框架的扩展，可选，具体参见框架扩展。
config/config.{env}.js 用于编写配置文件，具体参见配置。
config/plugin.js 用于配置需要加载的插件，具体参见插件。
test/** 用于单元测试，具体参见单元测试。
app.js 和 agent.js 用于自定义启动时的初始化工作，可选，具体参见启动自定义。关于 agent.js 的作用参见 Agent 机制。
