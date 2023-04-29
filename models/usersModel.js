const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");
const validator = require('validator')

const UserSchema = new Schema({

    fullName: {
        type:String,
    },

    gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: "Gender should be male, female, or other only"
    }
    },
  
    email:{
        type: String,
        require: true,
        validate : [validator.isEmail, 'Please provide a valid email'],
        unique: [true, "User Already Exist"],
        index: { unique: true }
    },

    mobileNumber:{
        type: Number,
        trim: true,
        min : [10, 'password should be greater than of 10 charector'],
    },

    password:{
        type:String,
        required: [true, 'Please Provide a Password'],
        min : [10, 'Mobile number shoud be of 10 charector'],
        select: false
    },

    country: {
        type: String,
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    active: {
        type: Boolean,
        default: true
    },

    passwordChangedAt: Date,

    avatar: {
        type: String,
        default: "https://coinswing.s3.ap-south-1.amazonaws.com/icon.png"
    },
});


UserSchema.pre('save', function (next) {
  // this function run only when password modified
  if (!this.isModified('password')) return next();

  // hassing the password
  let salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
  next()
})

UserSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword)
}

UserSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

module.exports = mongoose.model("User",UserSchema);