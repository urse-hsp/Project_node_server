// app/controller/users.js
import { Controller } from 'egg';
// import { logins } from '../modules/passport';

class UserController extends Controller {
  async authCallback() {
    const ctx = this.ctx;
    ctx.service.utils.resextra('GET', ctx.user);
  }
}

module.exports = UserController;
