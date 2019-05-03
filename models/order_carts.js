'use strict';
module.exports = (sequelize, DataTypes) => {
  const order_carts = sequelize.define('order_carts', {
    merchId: DataTypes.INTEGER,
    orderId: DataTypes.INTEGER,
    cutSleeves: DataTypes.BOOLEAN
  }, {});
  order_carts.associate = function(models) {
    // associations can be defined here
  };
  return order_carts;
};