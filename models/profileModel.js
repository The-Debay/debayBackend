const DataTypes = require('sequelize');
const {sequelize} = require('../config/sequelize');

const Profile = sequelize.define('profile', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profile_avtar: {
    type: DataTypes.STRING,
    default:'https://upload.wikimedia.org/wikipedia/commons/1/1e/Default-avatar.jpg'
  },
  description: {
    type: DataTypes.STRING(2000),
    allowNull: true,
  },
  date_of_registration: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  country:{
    type: DataTypes.STRING,
    allowNull: false,
    }
  },
  {
    timestamps: false // Include timestamps (createdAt, updatedAt)
  },
);

module.exports = Profile;