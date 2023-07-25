import { EggAppConfig, PowerPartial } from 'egg';
import databaseres from '../database/config.json';
const data: any = databaseres;

export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  console.log('unittest');
  config.sequelize = data.test;
  return config;
};
