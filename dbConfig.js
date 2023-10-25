const dbConfig = require("./config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  logging: 0,
  // logging: false, //To prevent default logging to console
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
})
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./model/User.model.js")(sequelize, Sequelize);
db.Profile = require("./model/Profile.model.js")(sequelize, Sequelize);

db.User.hasOne(db.Profile,{
  as:'profile',
  foreignKey:'userId',
});
db.Profile.belongsTo(db.User,{
  foreignKey:'userId',
})

module.exports = db;