import { Controller } from 'egg';

class HomeController extends Controller {
  async authCallback() {
    const ctx = this.ctx;
    ctx.service.utils.resextra(ctx.user);
  }
}

module.exports = HomeController;
