'use strict';
module.exports = app => {
  const { validator } = app;
  validator.addRule('rightId', (_rule, value) => {
    if (!value) {
      return '限权ID 不能为空';
    } else if (isNaN(parseInt(value))) {
      console.warn('current 必须是数字');
      return '限权ID 必须是数字';
    }
  });
};
