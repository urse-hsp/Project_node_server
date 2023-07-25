'use strict';

import { Controller } from 'egg';

class SearchController extends Controller {
  async index() {
    const { ctx } = this;

    ctx.body = 1123123; // `search: ${ctx.body.id}`;
  }
}

// export default SearchController;
module.exports = SearchController;
