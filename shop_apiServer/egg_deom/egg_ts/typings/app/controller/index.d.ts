// This file is created by egg-ts-helper@1.34.7
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportHome from '../../../app/controller/home';
import ExportSearch from '../../../app/controller/search';
import ExportTopics from '../../../app/controller/topics';
import ExportUsers from '../../../app/controller/users';
import ExportMyIndex from '../../../app/controller/my/index';

declare module 'egg' {
  interface IController {
    home: ExportHome;
    search: ExportSearch;
    topics: ExportTopics;
    users: ExportUsers;
    my: {
      index: ExportMyIndex;
    }
  }
}
