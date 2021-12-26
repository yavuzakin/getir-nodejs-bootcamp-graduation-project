const mongoose = require('mongoose');
const loggerSuccess = require('./../scripts/logger/application');
const loggerError = require('./../scripts/logger/error');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        // Successfull console log
        console.log('DB connection is successfull');
        // Successfull file log
        loggerSuccess.log({
            level: 'info',
            message: 'Connected to DB successfully'
        });
    } catch(err) {
        // Error console log
        console.log('DB connection error!');
        // Error file log
        loggerError.log({
            level: 'error',
            message: `Could not connect to DB. ${err.message}`
        });
    }
}

module.exports = {
    connectDB,
}