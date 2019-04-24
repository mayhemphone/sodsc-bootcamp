'use strict';
module.exports = (sequelize, DataTypes) => {
  const merch = sequelize.define('merch', {
    item: DataTypes.STRING,
    category: DataTypes.STRING,
    sex: DataTypes.STRING,
    price: DataTypes.INTEGER,
    collection: DataTypes.STRING,
    pre_order: DataTypes.STRING,
    members_only: DataTypes.BOOLEAN,
    active: DataTypes.BOOLEAN,
    img_1: DataTypes.STRING,
    img_2: DataTypes.STRING,
    img_3: DataTypes.STRING,
    color: DataTypes.STRING,
    no_size: DataTypes.BOOLEAN,
    desc: DataTypes.TEXT
  }, {});
  merch.associate = function(models) {
    // associations can be defined here

    models.merch.hasMany(models.inventory)
    

  };
  return merch;
};