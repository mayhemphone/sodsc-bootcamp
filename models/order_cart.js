'use strict';
module.exports = (sequelize, DataTypes) => {
  const order_cart = sequelize.define('order_cart', {
    merchId: DataTypes.INTEGER,
    orderId: DataTypes.INTEGER,
    cutSleeves: DataTypes.BOOLEAN
  }, {});
  order_cart.associate = function(models) {
    // associations can be defined here
  };
  return order_cart;
};