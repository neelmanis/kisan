const { body } = require("express-validator");

exports.validateSignin = [
  body("email")
    .notEmpty()
    .withMessage("email is required").bail()
    .isEmail()
    .withMessage("email is incorrect").bail()
    .normalizeEmail()
    .trim()
    .escape(),
  body("password")
    .notEmpty()
    .withMessage("password is required").bail()
    .isLength({ min: 8 })
    .withMessage("password is incorrect").bail()
    .trim()
    .escape()
];