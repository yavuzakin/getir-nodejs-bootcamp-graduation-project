const mongoose = require('mongoose');

const db = mongoose.connection;

db.once('open', () => {
    console.log('DB connection is successfull');

    // mongoose.connection.db.collection('records').find().toArray(function(e, d) {
    //     console.log(d);
    // })
});

const connectDB = async () => {
    await mongoose.connect('mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

module.exports = {
    connectDB,
}