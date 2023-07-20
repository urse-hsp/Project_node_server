'use strict';

export const isNan_Num = (value, msg = 'ID') => {
  if (!value) {
    return `${msg} 不能为空`;
  } else if (isNaN(parseInt(value))) {
    console.warn(`${msg} 必须是数字`);
    return `${msg} 必须是数字`;
  } else if (parseInt(value) <= 0) {
    console.warn(`${msg} 参数错误`);
    return `${msg} 参数错误`;
  }
};
module.exports = app => {
  const { validator } = app;
  // if (!req.query.current || req.query.current <= 0) return res.sendResult(null, 400, 'current 参数错误')
  //     if (!req.query.pageSize || req.query.pageSize <= 0) return res.sendResult(null, 400, 'pageSize 参数错误')
  validator.addRule('current', (_rule, value) => {
    return isNan_Num(value, 'current');
  });
  validator.addRule('pageSize', (_rule, value) => {
    return isNan_Num(value, 'pageSize');
  });
};
