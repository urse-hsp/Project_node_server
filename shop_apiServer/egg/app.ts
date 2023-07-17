import { setup } from './app/modules/passport';
import path from 'path';

// app.js
module.exports = app => {
  setup(app);

  // 加载所有的校验规则
  const directory = path.join(app.config.baseDir, 'app/modules/validate');
  app.loader.loadToApp(directory, 'validate');
};
