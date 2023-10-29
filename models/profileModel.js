const bcrypt = require('bcryptjs');

module.exports = (sequelize, Sequelize) => {
  const Profile = sequelize.define(
    'profile',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      profile_picture:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      date_of_registration: {
        type: Sequelize.DATE,
        default:Sequelize.DATE
      },
      location:{
        type: Sequelize.STRING,
        default:"",
      },
    },
    {

      },
  );

  return Profile;
};
