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
  root: string;
  constructor(ctx) {
    super(ctx);
    this.root = 'https://cnodejs.org/api/v1';
  }

  // 添加统一的返回结果方法
  async resextra(type: resextraType = 'GET', data: any) {
    const ctx = this.ctx;
    if (typeof data === 'string') {
      ctx.status = 422;
    } else {
      ctx.status = resextraType_Status[type];
    }
    ctx.body = data;
  }
}

module.exports = ManagerService;
