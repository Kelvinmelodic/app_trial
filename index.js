require("dotenv").config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))


connectDB()

const users = require("./routes/users");
const auth = require("./routes/auth");

app.use('/users', users)
app.use('/auth', auth)

const port = 4199
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
});