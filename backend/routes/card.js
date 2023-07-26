const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');

const {
  getCards,
  postCard,
  deleteCard,
  putlike,
  deletelike,
} = require('../controllers/card');

router.get('/cards', auth, getCards);
router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/^(http|https):\/\/(www\.)?[a-zA-Z0-9@:%+-~#=]{2,256}\.[a-z]{2,6}\b([a-zA-Z0-9-.~:/?#[\]@!$&'()+,;=])*/),
  }),
}), auth, postCard);
router.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), auth, deleteCard);
router.put('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), auth, putlike);
router.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), auth, deletelike);

module.exports = router;
