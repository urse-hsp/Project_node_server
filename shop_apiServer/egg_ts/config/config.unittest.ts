import { EggAppConfig, PowerPartial } from 'egg';
import databaseres from '../database/config.json';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  console.log('unittest');
  config.sequelize = databaseres.test;
  return config;
};
