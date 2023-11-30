'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      created: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Date.now()
      },
      updated: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Date.now()
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isDeleted:{
        type:Sequelize.BOOLEAN,
        default:false

      },
      isVerified:{
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      lastPasswordChange:{type: Sequelize.DATE}
    });
    await queryInterface.addIndex('Users', ['username'], { unique: true });
    await queryInterface.addIndex('Users', ['email'], {unique: true});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};