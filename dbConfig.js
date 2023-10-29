const Sequelize = require("sequelize");

const connectDB = async () => {
  const dbName = process.env.DB_NAME;
  const user = process.env.DB_user;
  const paswword = process.env.DB_NAME;
  const host = process.env.host;
  const port = process.env.port;
  try {
    const sequelize = new Sequelize(dbName, user, paswword, {
      host: host,
      port: port,
      dialect: "postgres",
      logging: false,
      pool: {
        max: 10, // Maximum number of connections in the pool
        min: 0,  // Minimum number of connections in the pool
        acquire: 30000, // Maximum time, in milliseconds, that pool will try to get the connection before throwing an error
        idle: 10000 // Maximum time, in milliseconds, that a connection can be idle before being released
      }
    });
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    return sequelize;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    return error.message;
  } finally {
    await sequelize.close();
  }
};

async function syncModels() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Synchronize models with the database (force: true will drop the tables before re-creating)
    await sequelize.sync({ force: true });
    console.log('All models were synchronized successfully.');

    // Run your migrations here if you have separate migration files
    // await sequelize.query('Your migration SQL query');

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await sequelize.close();
  }
}

syncModels();

module.exports = {
  connectDB,
};