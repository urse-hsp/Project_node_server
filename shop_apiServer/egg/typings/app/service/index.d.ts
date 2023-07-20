// This file is created by egg-ts-helper@1.34.7
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportDemo_ from '../../../app/service/demo_';
import ExportManagerService from '../../../app/service/managerService';
import ExportUtils from '../../../app/service/utils';
import ExportDaoIndex from '../../../app/service/dao/index';
import ExportDaoManagerDAO from '../../../app/service/dao/managerDAO';

declare module 'egg' {
  interface IService {
    demo_: AutoInstanceType<typeof ExportDemo_>;
    managerService: AutoInstanceType<typeof ExportManagerService>;
    utils: AutoInstanceType<typeof ExportUtils>;
    dao: {
      attributeDAO: any;
      permissionAPIDAO: any;
      PermissionAPIDAO: any;
      index: AutoInstanceType<typeof ExportDaoIndex>;
      managerDAO: AutoInstanceType<typeof ExportDaoManagerDAO>;
    }
  }
}
