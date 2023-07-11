'use strict';
import { Controller } from 'egg';

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
    ctx.status = 200;
  }
}

module.exports = HomeController;
