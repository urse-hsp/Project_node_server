import { Controller } from 'egg';

class HomeController extends Controller {
  async authCallback() {
    const ctx = this.ctx;
    ctx.service.utils.resextra('GET', ctx.user);
    // ctx.body = ctx.user;
    // ctx.status = 200;
  }
}

module.exports = HomeController;
