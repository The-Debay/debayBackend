const bcrypt = require('bcryptjs');

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    'user',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(64),
        allowNull: false,
        set(value) {
          this.setDataValue('password', bcrypt.hashSync(value, bcrypt.genSaltSync(10)));
        },  
      },
      isEmailVerified:{
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      otp:{
        type: Sequelize.INTEGER,
        default:null
      },
      lastOtpTime:{type: Sequelize.STRING}
    },
    {
        indexes: [
            {
              unique: true,
              fields: ['email'],
            },
            {
                unique: true,
                fields: ['username'],
              },
          ],
      },
  );

  return User;
};
