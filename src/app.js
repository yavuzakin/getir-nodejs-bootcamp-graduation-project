const express = require('express');
const loaders = require('./loaders');
const config = require('./config');
const recordRouter = require('./routes/recordRoutes');

config();
loaders();

const app = express();

app.use(express.json());
app.use('/api/records', recordRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening port number ${port}...`);
});