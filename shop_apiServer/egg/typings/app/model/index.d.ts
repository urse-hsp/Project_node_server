// This file is created by egg-ts-helper@1.34.7
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportDemo from '../../../app/model/demo';
import ExportManagerModel from '../../../app/model/managerModel';

declare module 'egg' {
  interface IModel {
    Demo: ReturnType<typeof ExportDemo>;
    ManagerModel: ReturnType<typeof ExportManagerModel>;
  }
}
