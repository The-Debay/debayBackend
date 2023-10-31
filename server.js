const app = require('./app')
const {connectToSqlDatabase}= require("./config/sequelize");
const { connectRedies } = require('./config/redis');

// all connection called here
(async () => {
  await connectToSqlDatabase();
  await connectRedies()
})();

port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`listening on port http://localhost:${port}`)
})