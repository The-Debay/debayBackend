// Assuming this is in your tagsModel.js file

const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/sequelize");
const User = require("./userModel");
const Profile = require("./profileModel");

const Tags = sequelize.define(
  "tags",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        msg: (value) => value + " already exists",
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
    },
  },
  {
    timestamps: true,
    tableName: 'tags',  // Ensure it matches the actual table name in your database
  }
);


User.hasMany(Tags, { foreignKey: "userId", as: "tags" });
Tags.belongsTo(User, { foreignKey: "userId", as: "user" });


module.exports = Tags;
