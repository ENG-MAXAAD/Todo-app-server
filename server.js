const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const mongoose = require('mongoose');

const userRouter = require('./src/routers/authentication/user');
app.use(express.json());

app.use('/user', userRouter)

mongoose.connect(process.env.DB_URL)
  .then(() => console.log('db connection established'))
  .catch((error) => console.log('DB failed to connect', error));

app.listen(process.env.PORT,  () =>    
    console.log('SUCCESSFULLY CONNECTED✅')
);