const xssSanitize = require('xss-sanitize')
const hpp = require('hpp')
const helmet = require('helmet')
const cors = require('cors')
require("dotenv").config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/uploads", express.static("uploads"));

app.use(cors())

app.use(helmet())

// prevent xss attact
app.use(xssSanitize())

// prevent hpp attacks
app.use(hpp())


connectDB()

const users = require("./routes/users");
const auth = require("./routes/auth");
const posts = require("./routes/posts")

app.use('/users', users)
app.use('/auth', auth)
app.use('/posts', posts)

const port = 4199
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
});