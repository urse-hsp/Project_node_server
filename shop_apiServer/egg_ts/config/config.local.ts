import { EggAppConfig, PowerPartial } from 'egg';
import databaseres from '../database/config.json';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  console.log('local');
  config.sequelize = databaseres.development;
  config.cluster = {
    listen: {
      port: 8081,
    },
  };
  return config;
};
