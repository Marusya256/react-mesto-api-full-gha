const { PORT = 3000 } = process.env;

const ERROR_CODE_BASE = 500;
const ERROR_CODE_NOT_FOUND = 404;

const express = require('express');

const { celebrate, Joi } = require('celebrate');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const mongoose = require('mongoose');

const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const routesUser = require('./routes/users');
const routesCard = require('./routes/card');
const { createUser, login } = require('./controllers/users');

const app = express();

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