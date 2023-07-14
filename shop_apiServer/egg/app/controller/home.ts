// app/controller/users.js
import { Controller } from 'egg';
// import { logins } from '../modules/passport';

class UserController extends Controller {
  async login() {
    const ctx = this.ctx;
    ctx.body = 123;
  }

  async authCallback() {
    const ctx = this.ctx;
    ctx.body = ctx.user;
    ctx.status = 201;
  }

  async tokenAuth() {}
}

module.exports = UserController;
