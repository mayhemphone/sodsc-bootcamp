'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('merches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      item: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      sex: {
        type: Sequelize.STRING
      },
      inventoryId: {
        type: Sequelize.INTEGER
      },
      collection: {
        type: Sequelize.STRING
      },
      pre_order: {
        type: Sequelize.STRING
      },
      members_only: {
        type: Sequelize.BOOLEAN,
        default: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('merches');
  }
};