const app = require('./app')
const {connectToSqlDatabase}= require("./config/sequelize");

// all connection called here
(async () => {
  await connectToSqlDatabase();
})();

port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`listening on port http://localhost:${port}`)
})