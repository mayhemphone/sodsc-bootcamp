'use strict';
module.exports = (sequelize, DataTypes) => {
  const content = sequelize.define('content', {
    title: DataTypes.STRING,
    meat: DataTypes.TEXT,
    description: DataTypes.STRING,
    featured: DataTypes.BOOLEAN
  }, {});
  content.associate = function(models) {
    // associations can be defined here
  };
  return content;
};