# hackernews-tegg

# RESTful 表现层状态转移

1. 在 RESTful 风格的设计，通过响应状态码来标识响应的状态，保持响应的 body 简洁，只返回接口数据。
1. 设计响应格式
1. 约束前后端的通信 响应格式

# 插件

1. egg-validate 参数校验模块 参数进行检验。比如检验一个用户名是不是字符串，可以这么写，
   ctx.validate({ userName: 'string' });
