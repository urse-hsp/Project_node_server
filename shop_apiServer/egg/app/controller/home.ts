// app/controller/users.js
import { Controller } from 'egg';
// import { logins } from '../modules/passport';

class UserController extends Controller {
  async login() {
    const ctx = this.ctx;
    // if (ctx.user.id) {
    //   ctx.status = 201;
    // } else {
    //   ctx.status = 401;
    // }

    ctx.body = {
      a: 1,
      b: {},
    };
  }

  async authCallback() {
    const ctx = this.ctx;
    // ctx.body = ctx.user;
    ctx.body = ctx.user;
    console.log(2222, ctx.user);
    ctx.status = 201;
  }

  async tokenAuth() {
    // const ctx = this.ctx;
    // ctx.body = 'tokenAuth';
  }
}

module.exports = UserController;
