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
      price: {
        type: Sequelize.INTEGER
      },
      collection: {
        type: Sequelize.STRING
      },
      pre_order: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      members_only: {
        type: Sequelize.BOOLEAN,
        default: false
      },
      active: {
        default: false,
        type: Sequelize.BOOLEAN        
      },
      img_1: {
        allowNull:false,
        type: Sequelize.STRING
      },
      img_2: {
        type: Sequelize.STRING
      },
      img_3: {
        type: Sequelize.STRING
      },
      desc: {
        type: Sequelize.TEXT
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('merches');
  }
};