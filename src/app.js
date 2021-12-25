const express = require('express');
const loaders = require('./loaders');
const recordRouter = require('./routes/recordRoutes');

loaders();

const app = express();

app.use(express.json());
app.use('/api/records', recordRouter);

app.listen(3000, () => {
    console.log('Listening port number 3000...');
})

// mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true
// mongodb+srv://mongodb:<password>@cluster0.wfk78.mongodb.net/myFirstDatabase?retryWrites=true&w=majority