'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      profile_avtar: {
        type: Sequelize.STRING,
        default:
          "https://upload.wikimedia.org/wikipedia/commons/1/1e/Default-avatar.jpg",
      },
  
      date_of_birth:{
        type:Sequelize.DATE,
        default:null
      },
      gender:{
        type:Sequelize.ENUM({
          values:['MALE','FEMALE','OTHER']
        }),
        default:'MALE'
      },
  
      bio: {
        type: Sequelize.STRING(2000),
        allowNull: true,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id"
        }
      }

    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('profiles');
  }
};
