const mongoose = require('mongoose');

const db = mongoose.connection;

db.once('open', () => {
    console.log('DB connection is successfull');
});

const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

module.exports = {
    connectDB,
}