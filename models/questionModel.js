const DataTypes = require("sequelize");
const { sequelize } = require("../config/sequelize");
const User = require("./userModel");
const InterestedTopics = require("./interestedTopics");
const Tags = require("./tags");

const Questions = sequelize.define(
  "questions",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    question:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id"
      }
    },
  },
  {
    timestamps: true,
    tableName: 'questions',  // Include timestamps (createdAt, updatedAt)
  }
);

Questions.hasOne(User,{
    forignKey:"userId",
    as:"user"
})

Questions.belongsToMany(Tags,{
    forignKey:"questionId",
    as:"questions",
    through:"question_tags"
})

Tags.belongsToMany(Questions,{
    forignKey:"tagId",
    as:"tags",
    through:"question_tags"
})



module.exports = Questions;
