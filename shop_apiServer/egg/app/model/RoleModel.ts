'use strict';

module.exports = app => {
  const { INTEGER } = app.Sequelize;

  const RoleModel = app.model.define(
    'RoleModel',
    {
      // 在这里定义模型属性
      role_id: { type: INTEGER, autoIncrement: true, primaryKey: true },
      role_name: String,
      ps_ids: String,
      ps_ca: String,
      role_desc: String,
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'sp_role',
    },
  );

  return RoleModel;
};
