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
      collection: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      desc: {
        type: Sequelize.TEXT
      },
      pre_order: {
        type: Sequelize.STRING
      },
      members_only: {
        type: Sequelize.BOOLEAN
      },
      no_size: {
        type: Sequelize.BOOLEAN
      },
      img_1: {
        type: Sequelize.STRING
      },
      img_2: {
        type: Sequelize.STRING
      },
      img_3: {
        type: Sequelize.STRING
      },
      active: {
        type: Sequelize.BOOLEAN
      },
      color: {
        type: Sequelize.STRING
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