'use strict';

import { Service } from 'egg';

type resextraType = 'GET' | 'POST' | 'PUT' | 'DELETE';
const resextraType_Status = {
  GET: 200,
  POST: 201,
  PUT: 204,
  DELETE: 204,
};

class ManagerService extends Service {
  // 添加统一的返回结果方法
  async resextra(data: any, types?: resextraType) {
    const ctx = this.ctx;
    const type: resextraType | string = ctx.request.method.toUpperCase();

    if (typeof data === 'string') {
      ctx.status = 422;
      ctx.body = {
        error: data,
      };
      return;
    }
    ctx.body = data;
    ctx.status = resextraType_Status[types ?? type];
  }
}

module.exports = ManagerService;
