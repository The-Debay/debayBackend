const DataTypes = require("sequelize");
const { sequelize } = require("../config/sequelize");
const User = require("./userModel");
const Tags = require("./tags");

const Profile = sequelize.define(
  "profiles",
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

    date_of_birth:{
      type:DataTypes.DATE,
      default:null
    },
    gender:{
      type:DataTypes.ENUM({
        values:['MALE','FEMALE','OTHER']
      }),
      default:'MALE'
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
      },
      unique:true
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

Tags.belongsToMany(Profile, {
  through: "intersted_user_topics",
  foreignKey: "tagId",
  as: "profiles",
});

Profile.belongsToMany(Tags, {
  through: "intersted_user_topics",
  foreignKey: "profileId",
  as: "tags",
});



// In tagsModel.js



module.exports = Profile;
