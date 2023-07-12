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
    console.log(ctx.user, 6666);

    ctx.body = {
      a: 1,
      b: ctx.user ?? {},
    };
  }

  async authCallback() {
    const ctx = this.ctx;
    // ctx.body = ctx.user;
    ctx.body = 123;
    ctx.status = 201;
  }

  async tokenAuth() {
    // const ctx = this.ctx;
    // ctx.body = 'tokenAuth';
  }
}

module.exports = UserController;
