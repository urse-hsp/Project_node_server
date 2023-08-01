// This file is created by egg-ts-helper@1.34.7
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportCategories from '../../../app/controller/categories';
import ExportGoods from '../../../app/controller/goods';
import ExportHome from '../../../app/controller/home';
import ExportNpm from '../../../app/controller/npm';
import ExportOrders from '../../../app/controller/orders';
import ExportRights from '../../../app/controller/rights';
import ExportRoles from '../../../app/controller/roles';
import ExportUpload from '../../../app/controller/upload';
import ExportUsers from '../../../app/controller/users';
import ExportDemoDemo2_ from '../../../app/controller/demo/demo2_';
import ExportDemoDemo3_ from '../../../app/controller/demo/demo3_';
import ExportDemoDemo_ from '../../../app/controller/demo/demo_';

declare module 'egg' {
  interface IController {
    categories: ExportCategories;
    goods: ExportGoods;
    home: ExportHome;
    npm: ExportNpm;
    orders: ExportOrders;
    rights: ExportRights;
    roles: ExportRoles;
    upload: ExportUpload;
    users: ExportUsers;
    demo: {
      demo2_: ExportDemoDemo2_;
      demo3_: ExportDemoDemo3_;
      demo_: ExportDemoDemo_;
    }
  }
}
