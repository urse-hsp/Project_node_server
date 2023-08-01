// This file is created by egg-ts-helper@1.34.7
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportAttributeService from '../../../app/service/attributeService';
import ExportCategoryService from '../../../app/service/categoryService';
import ExportGoodService from '../../../app/service/goodService';
import ExportManagerService from '../../../app/service/managerService';
import ExportOrderService from '../../../app/service/orderService';
import ExportRightService from '../../../app/service/RightService';
import ExportRoleService from '../../../app/service/roleService';
import ExportUtils from '../../../app/service/utils';
import ExportDaoAttributeDAO from '../../../app/service/dao/attributeDAO';
import ExportDaoGoodAttributeDAO from '../../../app/service/dao/goodAttributeDAO';
import ExportDaoIndex from '../../../app/service/dao/index';
import ExportDaoManagerDAO from '../../../app/service/dao/managerDAO';
import ExportDaoPermissionAPIDAO from '../../../app/service/dao/permissionAPIDAO';

declare module 'egg' {
  interface IService {
    attributeService: AutoInstanceType<typeof ExportAttributeService>;
    categoryService: AutoInstanceType<typeof ExportCategoryService>;
    goodService: AutoInstanceType<typeof ExportGoodService>;
    managerService: AutoInstanceType<typeof ExportManagerService>;
    orderService: AutoInstanceType<typeof ExportOrderService>;
    rightService: AutoInstanceType<typeof ExportRightService>;
    roleService: AutoInstanceType<typeof ExportRoleService>;
    utils: AutoInstanceType<typeof ExportUtils>;
    dao: {
      attributeDAO: AutoInstanceType<typeof ExportDaoAttributeDAO>;
      goodAttributeDAO: AutoInstanceType<typeof ExportDaoGoodAttributeDAO>;
      index: AutoInstanceType<typeof ExportDaoIndex>;
      managerDAO: AutoInstanceType<typeof ExportDaoManagerDAO>;
      permissionAPIDAO: AutoInstanceType<typeof ExportDaoPermissionAPIDAO>;
    }
  }
}
