const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
const app = require('./app');
const mongoose = require('mongoose');


// database connecttion
mongoose.set('strictQuery', true)
const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
    })
        .then(() => console.log("db connected successFully"))
        .catch((error) => console.log(`db connection error ${error}`))
}

// cron scheduler
const startApp = async () => {
    await connectDB()
}

startApp()

port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`listening on port http://localhost:${port}`)
})