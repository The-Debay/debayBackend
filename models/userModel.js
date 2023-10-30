const bcrypt = require('bcryptjs');
const DataTypes = require('sequelize');
const {sequelize} = require('../config/sequelize');


const User = sequelize.define('User', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  created: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Date.now()
  },
  updated: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Date.now()
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  lastPasswordChange: { type: DataTypes.DATE }
  },
  {
    timestamps: false // Include timestamps (createdAt, updatedAt)
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

module.exports = User;