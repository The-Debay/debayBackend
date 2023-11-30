'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('profiles', 'userId', {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id"
        },
        unique:true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('profiles', 'userId', {
      type: Sequelize.INTEGER,
      references: {
        model: "Users",
        key: "id"
      },
      unique:true
    });
  },
};
