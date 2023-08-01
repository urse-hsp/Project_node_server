// This file is created by egg-ts-helper@1.34.7
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportAttributeModel from '../../../app/model/AttributeModel';
import ExportCategoryModel from '../../../app/model/CategoryModel';
import ExportDemo from '../../../app/model/demo';
import ExportGoodModel from '../../../app/model/GoodModel';
import ExportGoodPicModel from '../../../app/model/GoodPicModel';
import ExportManagerModel from '../../../app/model/managerModel';
import ExportOrderGoodModel from '../../../app/model/OrderGoodModel';
import ExportOrderModel from '../../../app/model/OrderModel';
import ExportRoleModel from '../../../app/model/RoleModel';

declare module 'egg' {
  interface IModel {
    AttributeModel: ReturnType<typeof ExportAttributeModel>;
    CategoryModel: ReturnType<typeof ExportCategoryModel>;
    Demo: ReturnType<typeof ExportDemo>;
    GoodModel: ReturnType<typeof ExportGoodModel>;
    GoodPicModel: ReturnType<typeof ExportGoodPicModel>;
    ManagerModel: ReturnType<typeof ExportManagerModel>;
    OrderGoodModel: ReturnType<typeof ExportOrderGoodModel>;
    OrderModel: ReturnType<typeof ExportOrderModel>;
    RoleModel: ReturnType<typeof ExportRoleModel>;
  }
}
