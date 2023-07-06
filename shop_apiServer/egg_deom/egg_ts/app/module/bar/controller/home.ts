import { EggLogger } from 'egg';
import { Inject, HTTPController, HTTPMethod, HTTPMethodEnum } from '@eggjs/tegg';

// 主体路由
@HTTPController({
  path: '/',
})
export class HomeController {
  @Inject()
  logger: EggLogger;

  @HTTPMethod({
    method: HTTPMethodEnum.GET,
    path: 'a',
  })
  async index() {
    this.logger.info('hello egg logger');
    return 'hello egg1';
  }
}
