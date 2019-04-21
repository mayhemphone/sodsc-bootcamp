'use strict';
module.exports = (sequelize, DataTypes) => {
  const animal = sequelize.define('animal', {
    name: DataTypes.STRING,
    imgUrl: DataTypes.STRING
  }, {});
  animal.associate = function(models) {
    // associations can be defined here
  };
  return animal;
};