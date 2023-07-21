import { Controller } from 'egg';
// import path from 'path';
// import multer from 'multer';
import fs from 'fs';
import path from 'path';

// 管道读入一个虫洞。
import sendToWormhole from 'stream-wormhole';

// // 临时上传目录
// const upload = multer({ dest: 'tmp_uploads/' }).single('file'); // dest 值为文件存储的路径;single方法,表示上传单个文件,参数为表单数据对应的key
// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const upload_config = require(path.join(
//   process.cwd(),
//   'config/default.json',
// )).upload_config;

class uploadController extends Controller {
  async index() {
    const { ctx } = this;
    const stream = await ctx.getFileStream();

    const fileName = stream.filename;
    const target = path.join(
      this.config.baseDir,
      `app/public/comfiles/${stream.filename}`,
    );
    const fileExtArray = fileName.split('.');
    const ext = fileExtArray[fileExtArray.length - 1];
    // const targetPath = ctx.file.path + '.' + ext;
    console.log(fileName, 'target', ext, stream);

    const result = await new Promise((resolve, reject) => {
      const remoteFileStream = fs.createWriteStream(target);
      stream.pipe(remoteFileStream);
      let errFlag;
      remoteFileStream.on('error', err => {
        errFlag = true;
        sendToWormhole(stream);
        remoteFileStream.destroy();
        reject(err);
      });

      remoteFileStream.on('finish', async () => {
        if (errFlag) return;
        resolve({ fileName, name: stream.fields.name });
      });
    });
    ctx.body = result;
  }
}

module.exports = uploadController;
