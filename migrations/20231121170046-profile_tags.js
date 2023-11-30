'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('intersted_user_topics', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      profileId: {
        type: Sequelize.INTEGER,
        references: {
          model: "profiles",
          key: "id"
        }
      },
      tagId:{
        type: Sequelize.INTEGER,
        references: {
          model: "tags",
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
    await queryInterface.dropTable('intersted_user_topics');

  }
};
