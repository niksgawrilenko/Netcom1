require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');

const authRouter = require('./routers/authRouter');
const usersRouter = require('./routers/usersRouter');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(morgan('tiny'));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', '*');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use('/api/auth', authRouter);
app.use('/api/users/me', usersRouter);
app.use((err, req, res, next) => res.status(500).json({message: err.message}));

const start = async () => {
  await mongoose.connect('mongodb+srv://nikitosik:Nikita_gawrilenko2002@cluster0.5c8tu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  app.listen(PORT, () => console.log('server has run'));
};

start();
