import { EggAppConfig, PowerPartial } from 'egg';
import databaseres from '../database/config.json';
const data: any = databaseres;

export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  console.log('local');
  config.sequelize = data.development;
  config.cluster = {
    listen: {
      port: 8081,
    },
  };
  return config;
};
