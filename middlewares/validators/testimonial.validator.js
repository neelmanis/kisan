const { body } = require("express-validator");

const Testimonials = require('../../models/testimonial.model')

exports.validateNew = [
  body("name")
    .notEmpty()
    .withMessage("name is required").bail()
    .trim(),
  body("title")
    .notEmpty()
    .withMessage("title is required").bail()
    .trim()
    .escape(),
  body("feedback")
    .notEmpty()
    .withMessage("feedback is required").bail()
    .trim()
    .escape(),
  body("isFeatured")
    .notEmpty()
    .withMessage("select option").bail()
    .isIn(['yes','no'])
    .withMessage("option is incorrect").bail()
    .trim()
    .escape(),
  body("status")
    .notEmpty()
    .withMessage("status is required").bail()
    .isIn(['active','deactive'])
    .withMessage("status is incorrect").bail()
    .trim()
    .escape()
];

exports.validateExisting = [
  body("name")
    .notEmpty()
    .withMessage("name is required").bail()
    .trim(),
  body("title")
    .notEmpty()
    .withMessage("title is required").bail()
    .trim()
    .escape(),
  body("feedback")
    .notEmpty()
    .withMessage("feedback is required").bail()
    .trim()
    .escape(),
  body("isFeatured")
    .notEmpty()
    .withMessage("select option").bail()
    .isIn(['yes','no'])
    .withMessage("option is incorrect").bail()
    .trim()
    .escape(),
  body("status")
    .notEmpty()
    .withMessage("status is required").bail()
    .isIn(['active','deactive'])
    .withMessage("status is incorrect").bail()
    .trim()
    .escape()
];