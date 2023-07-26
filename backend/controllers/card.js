const mongoose = require('mongoose');
const Card = require('../models/card');
const ValidationError = require('../errors/validation-err');
const NotFoundError = require('../errors/not-found-err');
const NotOwnerError = require('../errors/not-owner-err');

const getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .populate('likes')
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

const postCard = (req, res, next) => {
  const { name, link, likes } = req.body;
  Card.create({
    name, link, owner: req.user._id, likes,
  })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError('Переданы некорректные данные.'));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId).orFail(new NotFoundError('Документ с указанным ID не найден.'))
    .then((card) => {
      if (req.user._id === card.owner._id.toString()) {
        Card.findByIdAndRemove(req.params.cardId).orFail(new NotFoundError('Документ с указанным ID не найден.'))
          .then((newCard) => res.send({ data: newCard }));
      } else {
        throw new NotOwnerError('Карточка не может быть удалена, т.к. вы не являетесь создателем карточки');
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new ValidationError('Передан некорректный ID.'));
      } else {
        next(err);
      }
    });
};

const putlike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).orFail(new NotFoundError('Документ с указанным ID не найден.'))
    .then((newCard) => res.send({ data: newCard }))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new ValidationError('Передан некорректный ID.'));
      } else {
        next(err);
      }
    });
};

const deletelike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).orFail(new NotFoundError('Документ с указанным ID не найден.'))
    .then((newCard) => res.send({ data: newCard }))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new ValidationError('Передан некорректный ID.'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards,
  postCard,
  deleteCard,
  putlike,
  deletelike,
};
