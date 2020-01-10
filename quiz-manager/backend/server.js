const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
//will need updating when sending off
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
.then(() => console.log('MongoDB database connection established successfully'))
.catch(err => {console.log(`DB Connection Error: ${err.message}`)});

const schoolsRouter = require('./routes/schools');
const usersRouter = require('./routes/users');
const quizRouter = require('./routes/quiz');

app.use('/schools', schoolsRouter);
app.use('/users', usersRouter);
app.use('/quiz', quizRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});