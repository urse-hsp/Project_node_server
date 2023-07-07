import { Controller } from 'egg';

class TopicsController extends Controller {
  createRule: {
    accesstoken: string
    title: string
    tab: { type: string; values: string[]; required: boolean }
    content: string
  };
  constructor(ctx) {
    super(ctx);

    // 定义创建接口的请求参数规则
    this.createRule = {
      accesstoken: 'string',
      title: 'string',
      tab: { type: 'enum', values: [ 'ask', 'share', 'job' ], required: false },
      content: 'string',
    };
  }

  async show() {
    const { ctx } = this;

    ctx.body = await ctx.service.topics.show({
      id: ctx.params.id,
      mdrender: ctx.query.mdrender !== 'false',
      accesstoken: ctx.query.accesstoken || '',
    });
  }

  async index() {
    const { ctx } = this;

    ctx.validate(
      {
        page: { type: 'string', format: /\d+/, required: false },
        tab: { type: 'enum', values: [ 'ask', 'share', 'job', 'good' ], required: false },
        limit: { type: 'string', format: /\d+/, required: false },
      },
      ctx.query,
    );

    ctx.body = await ctx.service.topics.list({
      page: ctx.query.page,
      tab: ctx.query.tab,
      limit: ctx.query.limit,
      mdrender: ctx.query.mdrender !== 'false',
    });
    ctx.status = 201;
  }

  async create() {
    const { ctx } = this;
    ctx.validate(this.createRule);

    const id = await ctx.service.topics.create(ctx.request.body);
    ctx.body = {
      topic_id: id,
    };
    ctx.status = 201;
  }

  async update() {
    const { ctx } = this;
    const id = ctx.params.id;

    ctx.validate(this.createRule);
    await ctx.service.topics.update(Object.assign({ id }, ctx.request.body));
    ctx.status = 204;
  }
}

module.exports = TopicsController;
