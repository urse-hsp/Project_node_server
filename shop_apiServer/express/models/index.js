const User = require('./user')
const ManagerModel = require('./ManagerModel')
const RoleModel = require('./RoleModel')
const GoodModel = require('./GoodModel')
const CategoryModel = require('./CategoryModel')
const OrderModel = require('./OrderModel')
const GoodPicModel = require('./GoodPicModel')
const GoodAttributeModel = require('./GoodAttributeModel')

module.exports = { ManagerModel, User, RoleModel, GoodModel, CategoryModel, OrderModel, GoodPicModel, GoodAttributeModel }

// autoIncrement 可用于创建 auto_incrementing 整数列 主键返回null问题
