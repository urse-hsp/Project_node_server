// app/controller/users.js
import { Controller } from 'egg';

class UserController extends Controller {
  async login() {
    const ctx = this.ctx;

    ctx.body = '123';
  }
}

module.exports = UserController;
