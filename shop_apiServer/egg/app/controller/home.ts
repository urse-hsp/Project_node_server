import { Controller } from 'egg';
import { login } from '../modules/passport';


class HomeController extends Controller {
  async login() {
    const { ctx } = this;

    const { username, password } = ctx.request.body;
    const user = await ctx.service.managerService.login(
      username,
      password,
    );

    if (!user) {
      // return done(null, false, { message: '账号或密码错误' });
      // return '登录失败';
      // ctx.service.utils.resextra('账号或密码错误');
      ctx.throw(401, '登录失败');
    }
    ctx.service.utils.resextra(login(user));
  }
}

module.exports = HomeController;
