'use strict';
module.exports = (sequelize, DataTypes) => {
  const inventory = sequelize.define('inventory', {
    merchId: DataTypes.INTEGER,
    size: DataTypes.STRING,
    count: DataTypes.INTEGER
  }, {});
  inventory.associate = function(models) {
    // associations can be defined here
    models.inventory.belongsTo(models.merch)
  };
  return inventory;
};