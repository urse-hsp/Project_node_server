const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')
const multer = require('multer')

// 临时上传目录
const upload = multer({ dest: 'tmp_uploads/' }).single('file') // dest 值为文件存储的路径;single方法,表示上传单个文件,参数为表单数据对应的key
const upload_config = require(path.join(process.cwd(), 'config/default.json')).upload_config

// TOP0 提供文件上传服务
router.post('/', upload, function (req, res, next) {
  const fileExtArray = req.file.originalname.split('.')
  const ext = fileExtArray[fileExtArray.length - 1]

  const targetPath = req.file.path + '.' + ext
  const tmp_path = upload_config.upload_path + `/${req.file.filename}` + '.' + ext
  fs.rename(path.join(process.cwd(), '/' + req.file.path), path.join(process.cwd(), targetPath), function (err) {
    if (err) {
      return res.sendResult(null, 400, '上传文件失败')
    }
    res.sendResult({ tmp_path: targetPath, url: upload_config.baseURL + tmp_path }, 200, '上传成功')
  })
})

module.exports = router
