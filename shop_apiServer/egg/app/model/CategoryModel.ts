'use strict';

module.exports = app => {
  const { INTEGER } = app.Sequelize;

  const User = app.model.define(
    'sp_category',
    {
      cat_id: { type: INTEGER, autoIncrement: true, primaryKey: true },
      cat_name: String,
      cat_pid: Number,
      cat_level: Number,
      cat_deleted: Boolean,
    },
    { tableName: 'sp_category', timestamps: false, freezeTableName: true },
  );

  return User;
};
