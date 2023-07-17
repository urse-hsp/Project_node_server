import { Controller } from 'egg';

class HomeController extends Controller {
  async authCallback() {
    const ctx = this.ctx;
    console.log(ctx.user, 123);
    ctx.service.utils.resextra('GET', ctx.user);
  }
}

module.exports = HomeController;
