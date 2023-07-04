const User = require('./user')
const ManagerModel = require('./ManagerModel')
const RoleModel = require('./RoleModel')
const GoodModel = require('./GoodModel')
const CategoryModel = require('./CategoryModel')
const OrderModel = require('./OrderModel')
const GoodPicModel = require('./GoodPicModel')
const GoodAttributeModel = require('./GoodAttributeModel')
const ReportTwoModel = require('./ReportTwoModel')
const ReportOneModel = require('./ReportOneModel')
const AttributeModel = require('./AttributeModel')

module.exports = {
  ManagerModel,
  User,
  RoleModel,
  GoodModel,
  CategoryModel,
  OrderModel,
  GoodPicModel,
  GoodAttributeModel,
  ReportTwoModel,
  ReportOneModel,
  AttributeModel,
}

// autoIncrement 可用于创建 auto_incrementing 整数列 主键返回null问题

// var path = require('path')
// var fs = require('fs')
// var modelsPath = path.join(process.cwd(), '/models')
// console.log(modelsPath, 6)
// fs.readdir(modelsPath, function (err, files) {
//   // 存放所有的加载模型函数
//   var loadModelAsynFns = new Array()
//   // console.log("开始加载 ORM 模型层文件 ");
//   for (var i = 0; i < files.length; i++) {
//     var modelPath = modelsPath + '/' + files[i]
//     // console.log("加载模型 %s",modelPath);
//     loadModelAsynFns[i] = modelPath
//   }
//   console.log(loadModelAsynFns, 6)
// })
