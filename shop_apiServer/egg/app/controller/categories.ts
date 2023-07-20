import { Controller } from 'egg';

class CategoriesController extends Controller {
  // 获取分类列表
  async index() {
    const ctx = this.ctx;
    // 参数验证
    // ctx.validate(
    //   {
    //     current: { type: 'current?' },
    //     pageSize: { type: 'pageSize?' },
    //     query: 'string?',
    //   },
    //   ctx.query,
    // );
    let conditions: any = null;
    if (ctx.query.current && ctx.query.pageSize) {
      conditions = {
        current: ctx.query.current,
        pageSize: ctx.query.pageSize,
      };
    }
    const res = await ctx.service.categoryService.getAllCategories(
      ctx.query.type,
      conditions,
    );
    ctx.service.utils.resextra(res);
  }

  // 创建商品分类
  async create() {
    const { ctx } = this;
    // 参数验证
    ctx.validate(
      {
        cat_name: {
          type: 'string', // 直接赋值给rule传过来
          message: '必须提供分类名称',
        },
      },
      ctx.request.body,
    );

    console.log(312);
    const params = {
      cat_pid: ctx.request.body.cat_pid,
      cat_name: ctx.request.body.cat_name,
      cat_level: ctx.request.body.cat_level,
    };
    const res = await ctx.service.categoryService.addCategory(params);
    ctx.service.utils.resextra(res);
  }

  // // router.get(
  // //   '/:id',
  // //   // 参数验证
  // //   function (req, res, next) {
  // //     if (!req.params.id) {
  // //       return res.sendResult(null, 400, '分类ID不能为空')
  // //     }
  // //     if (isNaN(parseInt(req.params.id))) return res.sendResult(null, 400, '分类ID必须是数字')
  // //     next()
  // //   },
  // //   // 正常业务逻辑
  // //   function (req, res, next) {
  // //     catServ.getCategoryById(req.params.id, function (err, result) {
  // //       if (err) return res.sendResult(null, 400, err)
  // //       res.sendResult(result, 200, '获取成功')
  // //     })(req, res, next)
  // //   }
  // // )

  // 删除分类
  async destroy() {
    const { ctx } = this;
    // 参数验证
    ctx.validate(
      {
        id: {
          type: 'id',
        },
      },
      ctx.params,
    );

    const res = await ctx.service.categoryService.deleteCategory(
      ctx.params.id,
      ctx.request.body.cat_name,
    );
    ctx.service.utils.resextra(res);
  }

  // 更新分类
  async update() {
    const { ctx } = this;
    // 参数验证
    ctx.validate(
      {
        id: {
          type: 'id',
        },
      },
      ctx.params,
    );
    ctx.validate(
      {
        cat_name: {
          type: 'string',
          message: '分类名称不能为空',
        },
      },
      ctx.request.body,
    );

    const res = await ctx.service.categoryService.updateCategory(
      ctx.params.id,
      ctx.request.body.cat_name,
    );
    ctx.service.utils.resextra(res);
  }

  //  通过参数方式查询静态参数还是动态参数
  async getAttributes() {
    const { ctx } = this;
    // 参数验证
    ctx.validate(
      {
        id: {
          type: 'id',
        },
      },
      ctx.params,
    );

    ctx.validate(
      {
        sel: { type: 'enum', values: [ 'only', 'many' ], message: '属性类型必须设置' },
      },
      ctx.query,
    );

    const res = await ctx.service.attributeService.getAttributes(
      ctx.params.id,
      ctx.query.sel,
    );
    ctx.service.utils.resextra(res);
  }

  // // 获取参数 详情
  // router.get(
  //   '/:id/attributes/:attrId',
  //   // 验证参数
  //   function (req, res, next) {
  //     if (!req.params.id) {
  //       return res.sendResult(null, 400, '分类ID不能为空')
  //     }
  //     if (isNaN(parseInt(req.params.id))) return res.sendResult(null, 400, '分类ID必须是数字')
  //     if (!req.params.attrId) {
  //       return res.sendResult(null, 400, '参数ID不能为空')
  //     }
  //     if (isNaN(parseInt(req.params.attrId))) return res.sendResult(null, 400, '参数ID必须是数字')
  //     next()
  //   },
  //   function (req, res, next) {
  //     attrServ.attributeById(req.params.attrId, function (err, attr) {
  //       if (err) return res.sendResult(null, 400, err)
  //       res.sendResult(attr, 200, '获取成功')
  //     })
  //   }
  // )

  // // 创建参数
  async createAttributes() {
    const { ctx } = this;
    // 参数验证
    ctx.validate(
      {
        id: {
          type: 'id',
        },
      },
      ctx.params,
    );

    ctx.validate(
      {
        attr_name: {
          type: 'string',
          message: '参数名称不能为空',
        },
      },
      ctx.request.body,
    );

    ctx.validate(
      {
        attr_sel: {
          type: 'enum',
          values: [ 'only', 'many' ],
          required: false,
          message: '参数 attr_sel 类型必须为 only 或 many',
        },
        attr_write: {
          type: 'enum',
          values: [ 'manual', 'list' ],
          required: false,
          message: '参数 attr_write 必须为 manual 或 list',
        },
      },
      ctx.query,
    );

    const { body } = ctx.request;
    const params = {
      attr_name: body.attr_name,
      cat_id: ctx.params.id,
      attr_sel: body.attr_sel,
      attr_write: body.attr_sel === 'many' ? 'list' : 'manual', // body.attr_write,
      attr_vals: body.attr_vals ? body.attr_vals : '',
    };

    const res = await ctx.service.attributeService.createAttribute(params);
    ctx.service.utils.resextra(res);
  }

  // 更新参数
  async updateAttributes() {
    const { ctx } = this;
    // 参数验证
    ctx.validate(
      {
        id: {
          type: 'string',
          message: '分类ID不能为空',
        },
        attrId: {
          type: 'id',
        },
      },
      ctx.params,
    );
    ctx.validate(
      {
        attr_sel: {
          type: 'enum',
          values: [ 'only', 'many' ],
          required: false,
          message: '参数 attr_sel 类型必须为 only 或 many',
        },
        attr_name: {
          type: 'string',
          message: '参数名称不能为空',
        },
      },
      ctx.query,
    );
    const { body } = ctx.request;

    const params = {
      attr_name: body.attr_name,
      cat_id: ctx.params.id,
      attr_sel: body.attr_sel,
      attr_write: body.attr_sel === 'many' ? 'list' : 'manual', // body.attr_write,
      attr_vals: body.attr_vals ? body.attr_vals : '',
    };
    const res = await ctx.service.attributeService.updateAttribute(
      ctx.params.attrId,
      params,
    );
    ctx.service.utils.resextra(res);
  }

  // 删除参数
  async deleteAttributes() {
    console.log('删除');

    const { ctx } = this;
    // 参数验证
    ctx.validate(
      {
        id: {
          type: 'string',
          message: '分类ID不能为空',
        },
        attrId: {
          type: 'id',
        },
      },
      ctx.params,
    );

    const res = await ctx.service.attributeService.deleteAttribute(ctx.params.attrId);
    ctx.service.utils.resextra(res);
  }
}

module.exports = CategoriesController;
