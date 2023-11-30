'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name:{
          type:Sequelize.STRING,
          allowNull:false,
      },
      description:{
          type:Sequelize.STRING,
          allowNull:true,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id"
        }
      },
      createdAt:{
        type:Sequelize.DATE,
        default:Date.now
      },
      updatedAt:{
        type:Sequelize.DATE,
        default:Date.now
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('tags');
  }
};
