import { EggAppConfig, PowerPartial } from 'egg';
import databaseres from '../database/config.json';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  config.sequelize = databaseres.development;
  return config;
};
