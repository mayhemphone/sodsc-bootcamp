'use strict';
module.exports = (sequelize, DataTypes) => {
  const cart_items = sequelize.define('cart_items', {
    userId: DataTypes.INTEGER,
    merchId: DataTypes.INTEGER,
    size: DataTypes.STRING,
    sleeves: DataTypes.BOOLEAN
  }, {});
  cart_items.associate = function(models) {
    // associations can be defined here
    models.cart_items.belongsTo(models.user)
    models.cart_items.belongsTo(models.merch)

  };
  return cart_items;
};