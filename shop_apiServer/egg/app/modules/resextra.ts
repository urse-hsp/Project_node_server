// app/extend/application.js

// 添加统一的返回结果方法
const res = app => {
  // app(fn());
  app.fn = () => {
    console.log(123);
  };
};

export default res;
