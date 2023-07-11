'use strict';

module.exports = app => {
  const { INTEGER } = app.Sequelize;

  const ManagerModel = app.model.define(
    'ManagerModel',
    {
      // 在这里定义模型属性
      mg_id: { type: INTEGER, autoIncrement: true, primaryKey: true },
      mg_name: String,
      mg_pwd: String,
      mg_time: Number,
      role_id: Number,
      mg_mobile: String,
      mg_email: String,
      mg_state: Number,
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'sp_manager',
    },
  );

  return ManagerModel;
};
