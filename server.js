const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser');
const app = express()
const port = process.env.PORT;
const morgan = require('morgan');
const cors = require('cors')
const globalErrorHandler = require('./controller/errorController');
const AppError = require('./utils/appError')
const db = require("./dbConfig");

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors())
app.use(express.json())


db.sequelize.sync({alter:true})
  .then(async () => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
});


app.use("/api/v1", require('./routes/index'))
// app.use('/api/v1/media', express.static(process.env.FILE_LOCATION))

app.listen(port, () => {
  console.log(`App running on port http://localhost:${port}`)
})

app.use(globalErrorHandler)



// app.use(
//   '/api-docs',
//   swaggerUi.serve, 
//   swaggerUi.setup(swaggerDocument)
// );
// customCssUrl:
// "https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-newspaper.css",
// })

app.all('*', (req, res, next) => {

  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
})
