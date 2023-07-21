import { Controller } from 'egg';
import path from 'path';
// import multer from 'multer';
import fs from 'fs';
import sendToWormhole from 'stream-wormhole'; // 关闭文件流

class uploadController extends Controller {
  async index() {
    const { ctx } = this;
    const stream = await ctx.getFileStream();
    const { upload_config } = this.config;

    // const fileName = stream.filename;
    // 获取一个随机名称 + 当前时间的时间戳 组成新的文件名
    const fileName: any =
      Math.random().toString(36).substr(2) +
      new Date().getTime() +
      path.extname(stream.filename).toLocaleLowerCase();
    const target = path.join(
      this.config.baseDir,
      'app' + upload_config.upload_path,
      fileName,
    );
    const tmp_path = upload_config.baseURL + upload_config.upload_path + fileName;

    const result = await new Promise((resolve, reject) => {
      const remoteFileStream = fs.createWriteStream(target); // 创建写入流--对文件流进行写入--第一个参数为路径，要自定义！！

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
        resolve({ fileName, tmp_path });
      });
    });
    ctx.body = result;
  }
}

module.exports = uploadController;
