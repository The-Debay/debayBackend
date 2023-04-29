const express = require('express');
const cors = require('cors')
const morgan = require('morgan');
const app = express();
// const globalErrorHandler = require('./controllers/errorController');
// const AppError = require('./utils/appError')
// const userRouter = require('./routes/userRoutes')
// const userBetRoutes = require('./routes/userBetRoutes')
// const betRoutes = require('./routes/betRoutes')


// Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(cors()) 
app.use(express.json())

// app.use('/api/v1/', userRouter)
// app.use('/api/v1/', userBetRoutes)
// app.use('/api/v1/', betRoutes)

app.all('*', (req, res, next) => {

    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
})

// app.use(globalErrorHandler)


module.exports = app;