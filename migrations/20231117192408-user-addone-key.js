'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'isDeleted', {
      type: Sequelize.BOOLEAN, // Specify the data type of the new column
      defaultValue: false, // Set a default value if needed
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'isDeleted');
  },
};