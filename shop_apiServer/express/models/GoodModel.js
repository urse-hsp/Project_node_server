const { sequelize } = require('../modules/database')
const GoodModel = sequelize.define(
  'sp_user', // 别名
  {
    goods_id: { type: 'serial', key: true, primaryKey: true },
    cat_id: Number,
    goods_name: String,
    goods_price: Number,
    goods_number: Number,
    goods_weight: Number,
    goods_introduce: String,
    goods_big_logo: String,
    goods_small_logo: String,
    goods_state: Number, // 0：未审核 1: 审核中 2: 已审核
    is_del: ['0', '1'], // 0: 正常 , 1: 删除
    add_time: Number,
    upd_time: Number,
    delete_time: Number,
    hot_mumber: Number,
    is_promote: Boolean,
    cat_one_id: Number,
    cat_two_id: Number,
    cat_three_id: Number,
  },
  {
    // 这是其他模型参数
    // 用来设置字段以外的其他信息
    tableName: 'sp_goods',
    timestamps: false,
    freezeTableName: true,
    methods: {
      getGoodsCat: function () {
        return this.cat_one_id + ',' + this.cat_two_id + ',' + this.cat_three_id
      },
    },
  }
) // 查询所有

module.exports = GoodModel
