const DataTypes = require("sequelize");
const { sequelize } = require("../config/sequelize");
const User = require("./userModel");

const Profile = sequelize.define(
  "profile",
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
    },
    profile_avtar: {
      type: DataTypes.STRING,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/1/1e/Default-avatar.jpg",
    },
    bio: {
      type: DataTypes.STRING(2000),
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id"
      }
    }
  },
  {
    timestamps: false,
    tableName: 'profiles',  // Include timestamps (createdAt, updatedAt)
  }
);

Profile.belongsTo(User, {
  foreignKey: 'userId'
});
User.hasOne(Profile, {
  foreignKey: 'userId'
});
// Profile.belongsTo(User,{
//   forignKey:"userId"
// })
// User.hasOne(Profile,{
//   forignKey:"userId"
// });

module.exports = Profile;
