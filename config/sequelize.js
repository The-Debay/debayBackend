const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}
const connectToSqlDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    return sequelize;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    return error.message;
  }
};

// async function syncModels() {
//   try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');

//     // Synchronize models with the database (force: true will drop the tables before re-creating)
//     await sequelize.sync({ force: true });
//     console.log('All models were synchronized successfully.');

//     // Run your migrations here if you have separate migration files
//     // await sequelize.query('Your migration SQL query');

//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   } finally {
//     await sequelize.close();
//   }
// }

// syncModels();

module.exports = { connectToSqlDatabase, sequelize }