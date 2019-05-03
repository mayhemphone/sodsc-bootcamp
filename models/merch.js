'use strict';
module.exports = (sequelize, DataTypes) => {
  const merch = sequelize.define('merch', {
    item: DataTypes.STRING,
    category: DataTypes.STRING,
    sex: DataTypes.STRING,
    collection: DataTypes.STRING,
    price: DataTypes.INTEGER,
    desc: DataTypes.TEXT,
    pre_order: DataTypes.STRING,
    members_only: DataTypes.BOOLEAN,
    no_size: DataTypes.BOOLEAN,
    img_1: DataTypes.STRING,
    img_2: DataTypes.STRING,
    img_3: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    color: DataTypes.STRING
  }, {});
  merch.associate = function(models) {
    // associations can be defined here
    models.merch.hasMany(models.inventory)
    models.merch.hasMany(models.cart_items)
  };
  return merch;
};