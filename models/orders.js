'use strict';
module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define('orders', {
    userId: DataTypes.INTEGER,
    merchId: DataTypes.INTEGER,
    size: DataTypes.STRING,
    sleeves: DataTypes.BOOLEAN,
    quantity: DataTypes.INTEGER
  }, {});
  orders.associate = function(models) {
    // associations can be defined here
  };
  return orders;
};