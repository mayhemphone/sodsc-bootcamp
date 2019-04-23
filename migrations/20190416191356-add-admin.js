'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'admin', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'admin')
  }
};


//sequelize migration:create --name add-admin 
// then modify the file like this one
// then run sequelize db:migrate