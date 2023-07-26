const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');

const {
  getUsers,
  getUserID,
  updateUser,
  updateAvatar,
  getUser,
  logOut,
} = require('../controllers/users');

router.get('/users', auth, getUsers);
router.get('/users/me', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
}), auth, getUser);
router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
}), auth, getUserID); //
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    about: Joi.string().min(2).max(30),
    name: Joi.string().min(2).max(30),
  }),
}), auth, updateUser);
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(/^(http|https):\/\/(www\.)?[a-zA-Z0-9@:%+-~#=]{2,256}\.[a-z]{2,6}\b([a-zA-Z0-9-.~:/?#[\]@!$&'()+,;=])*/),
  }),
}), auth, updateAvatar);
router.post('/users/me/logout', auth, logOut);

module.exports = router;
