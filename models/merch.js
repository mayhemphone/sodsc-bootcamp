'use strict';
module.exports = (sequelize, DataTypes) => {
  const merch = sequelize.define('merch', {
    item: DataTypes.STRING,
    category: DataTypes.STRING,
    sex: DataTypes.STRING,
    inventoryId: DataTypes.INTEGER,
    collection: DataTypes.STRING,
    pre_order: DataTypes.STRING
  }, {});
  merch.associate = function(models) {
    // associations can be defined here
  };
  return merch;
};