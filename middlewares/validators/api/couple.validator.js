const { body } = require("express-validator");

const Couple = require('../../../models/couple.model')

exports.validateCoupleSignin = [
  body("email")
    .notEmpty()
    .withMessage("email is required").bail()
    .isEmail()
    .withMessage("email is incorrect").bail()
    .normalizeEmail()
    .trim()
    .escape()
    .custom((value, { req }) => {
      return new Promise((resolve, reject) => {
        Couple.findOne({ 
          where: { email: value }
        })
        .then(couple => {
          if (!couple) {
            return resolve(true)
          }

          return reject(new Error('E-mail already in use'));
        })
        .catch(err => reject(new Error('email already in use')));
      })
    }),
  body("phone")
    .notEmpty()
    .withMessage("phone is required").bail()
    .isLength({ max: 10 })
    .withMessage("phone is incorrect").bail()
    .isNumeric({no_symbols: false})
    .withMessage("phone is incorrect").bail()
    .trim()
    .escape(),
  body("password")
    .notEmpty()
    .withMessage("password is required").bail()
    .isLength({ min: 8 })
    .withMessage("password is too short").bail()
    .trim()
    .escape(),
  body("confirmPassword")
    .notEmpty()
    .withMessage("password is required").bail()
    .isLength({ min: 8 })
    .withMessage("password is too short").bail()
    .trim()
    .escape()
    .custom((value, { req }) => {
      return new Promise((resolve, reject) => {
        const { password } = req.body
        return value == password ? resolve(true) : reject(new Error('password do not match'));
      })
    })
];

exports.validatePersonalDetails = [
  body("brideName")
    .notEmpty()
    .withMessage("name is required").bail()
    .trim()
    .escape(),
  body("groomName")
    .notEmpty()
    .withMessage("name is required").bail()
    .trim()
    .escape(),
  body("presonalMessage")
    .notEmpty()
    .withMessage("message is required").bail()
    .trim()
    .escape()
];