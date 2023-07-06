'use strict';
import { Controller } from 'egg';

class HomeControllers extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'mys';
  }
}

module.exports = HomeControllers;
