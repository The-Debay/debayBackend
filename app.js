const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors')
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError')
const app = express();

// router imports
const authRouter = require('./routes/authRoutes')
const profileRoute = require('./routes/profileRoutes')
const tagsRoute = require('./routes/tagRoutes')

// Parse JSON bodies for API requests
app.use(bodyParser.json());

// Parse URL-encoded bodies for form submissions
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors())
app.use(express.json())

// Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(cors()) 
app.use(express.json())

// base API with virsion
baseAPI = '/api/v1'

app.use(`${baseAPI}`, authRouter)
app.use(`${baseAPI}`,profileRoute)
app.use(`${baseAPI}`,tagsRoute)



app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
})

app.use(globalErrorHandler)


module.exports = app;