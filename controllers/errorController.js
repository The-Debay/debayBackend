const AppError = require('./../utils/appError');
const _ = require('lodash')

const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = err => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(el => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleSendValidationError  = err => {
    let message = err.message
    return new AppError(message, 400);
}

const validationError = err => {

  console.log(_.get(err,'errors',[]))
  let errorsFields = _.get(err,'errors[0]',{})
  return new AppError(`${_.get(errorsFields,'message',"")}, ${_.get(errorsFields,'path',"")} => ${_.get(errorsFields,'value',"")}  already exist`,400)
}

const handleJWTError = () =>
  new AppError('Invalid token. Please log in again!', 401);

const handleJWTExpiredError = () =>
  new AppError('Invalid token. Please log in again!.', 401);

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
      status: err.status,
    //   error: err,
      message: err.message,
    //   stack: err.stack
    });
};

const sendErrorProd = (err, res) => {
    // Operational, trusted error: send message to client
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
  
      // Programming or other unknown error: don't leak error details
    } else {

        console.log(err.name,"error",err)
      // 1) Log error
    //   console.error('ERROR 💥', err);
  
      // 2) Send generic message
      res.status(500).json({
        status: 'error',
        message: 'Something went very wrong!'
      });
    }
};


module.exports = (err, req, res, next) => {
    // console.log(err.stack);
  
    console.log(err)
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
  
    if (process.env.NODE_ENV === 'development') {
      sendErrorDev(err, res);
      
    } else if (process.env.NODE_ENV === 'production') {
      
      if (err.name === 'CastError') err = handleCastErrorDB(err);
      if (err.code === 11000) err = handleDuplicateFieldsDB(err);
      if (err.name === 'ValidationError') err = handleValidationErrorDB(err);
      if (err.name === 'JsonWebTokenError') err = handleJWTError();
      if (err.name === 'TokenExpiredError') err = handleJWTExpiredError();
      if(err.name ===  "SequelizeValidationError") err = handleSendValidationError(err);
      if(err.name === "SequelizeUniqueConstraintError") err = validationError(err)
      // if(err.name === 'Error') err = invalidValuesError(err)
      
      sendErrorProd(err, res);
    }
};