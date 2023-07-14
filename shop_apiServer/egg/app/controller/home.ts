// app/controller/users.js
import { Controller } from 'egg';
// import { logins } from '../modules/passport';

class UserController extends Controller {
  async authCallback() {
    const ctx = this.ctx;
    console.log(this.ctx.user, 123);

    ctx.service.utils.resextra('GET', ctx.user);
    // ctx.body = ctx.user;
    // ctx.status = 200;
  }
}

module.exports = UserController;
