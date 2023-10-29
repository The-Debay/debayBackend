const bcrypt = require('bcryptjs');
const { DataTypes } = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define( 'user', {
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
    isVerified:{
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    lastPasswordChange:{type: Sequelize.DATE}
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
