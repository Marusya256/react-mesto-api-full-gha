const { PORT = 3000 } = process.env;

const ERROR_CODE_BASE = 500;
const ERROR_CODE_NOT_FOUND = 404;

const express = require('express');

const { celebrate, Joi } = require('celebrate');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const cors = require('cors');

const mongoose = require('mongoose');

const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const routesUser = require('./routes/users');
const routesCard = require('./routes/card');
const { createUser, login } = require('./controllers/users');

const app = express();

const allowedCors = [
  'http://mesto.galamm.nomoreparties.sbs',
  'https://mesto.galamm.nomoreparties.sbs',
  'http://api.mesto.galamm.nomoreparties.sbs',
  'https://api.mesto.galamm.nomoreparties.sbs',
  'localhost:3000',
];

app.use(cors({ origin: ['http://mesto.galamm.nomoreparties.sbs', 'https://mesto.galamm.nomoreparties.sbs', 'http://api.mesto.galamm.nomoreparties.sbs', 'https://api.mesto.galamm.nomoreparties.sbs', 'localhost:3000'], credentials: 'true' }));

app.use((req, res, next) => {
  const { origin } = req.headers;

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  const { method } = req;

  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Cookie');

    return res.end();
  }

  next();

  // return res;
});

app.use(cookieParser());

app.use(bodyParser.json());

app.use(requestLogger);

app.use('/', routesUser, routesCard);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    password: Joi.string().required().min(8),
    email: Joi.string().required().email(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    password: Joi.string().required().min(8),
    email: Joi.string().required().email(),
    avatar: Joi.string().pattern(/^(http|https):\/\/(www\.)?[a-zA-Z0-9@:%+-~#=]{2,256}\.[a-z]{2,6}\b([a-zA-Z0-9-.~:/?#[\]@!$&'()+,;=])*/),
    about: Joi.string().min(2).max(30),
    name: Joi.string().min(2).max(30),
  }),
}), createUser);

app.use((req, res) => {
  res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Страница не найдена' });
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = ERROR_CODE_BASE, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === ERROR_CODE_BASE
        ? 'На сервере произошла ошибка'
        : message,
    });

  next();
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  })
  .catch((res) => {
    res.status(ERROR_CODE_BASE).send({ message: 'Ошибка' });
  });
