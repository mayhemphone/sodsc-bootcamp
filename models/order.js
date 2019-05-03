'use strict';
module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define('order', {
    userId: DataTypes.INTEGER,
    order_num: DataTypes.INTEGER,
    merchId: DataTypes.INTEGER,
    size: DataTypes.STRING,
    sleeves: DataTypes.BOOLEAN,
    quantity: DataTypes.INTEGER
  }, {});
  order.associate = function(models) {
    // associations can be defined here
  };
  return order;
};