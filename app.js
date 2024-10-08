const express = require('express');
require('dotenv').config();
const indexRouter = require('./server/router/indexRouter')

const app = express();
const { join } = require('path');

const Database = require('./server/database/databaseMongo')

Database.getInstance()

app.use('/css', express.static(join( __dirname, 'src/css')));
app.use('/js', express.static(join( __dirname, 'src/js')));
app.use('/storage', express.static(join( __dirname, 'src/storage')));


app.use("/", indexRouter);


app.use((req, res) => {
    res.status(404).json({ message: "The endpoint is not available" });
});

let config = {
    port: process.env.EXPRESS_PORT,
    host: process.env.EXPRESS_HOST_NAME
}
app.listen(config, () => {
    console.log(`${process.env.EXPRESS_PROTOCOL}${config.host}:${config.port}`);
});




