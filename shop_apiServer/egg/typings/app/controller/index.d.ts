// This file is created by egg-ts-helper@1.34.7
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportDemo2_ from '../../../app/controller/demo2_';
import ExportDemo_ from '../../../app/controller/demo_';
import ExportHome from '../../../app/controller/home';
import ExportUsers from '../../../app/controller/users';

declare module 'egg' {
  interface IController {
    demo2_: ExportDemo2_;
    demo_: ExportDemo_;
    home: ExportHome;
    users: ExportUsers;
  }
}
