const { body } = require("express-validator");

const Admin = require('../../models/admin/adminModel')

exports.validateAdminSignin = [
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .trim()
    .escape(),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .trim()
    .escape()
];

exports.validateAdminUpdateProfile = [
  body("name")
    .notEmpty()
    .withMessage("name is required")
    .trim()
    .escape(),
  body("username")
    .notEmpty()
    .withMessage("username is required").bail()
    .isLength({ min: 6 })
    .withMessage("username is too short").bail()
    .trim()
    .escape()
    .custom((value, { req }) => {
      return new Promise((resolve, reject) => {
        const { username } = req.admin

        if( value == username ){
          return resolve(true)
        }else{
          Admin.findOne({ 
            where: { username: value }
          })
          .then(admin => {
            if (!admin) {
              return resolve(true)
            }
  
            return reject(new Error('username already in use'));
          })
          .catch(err => reject(new Error('username already in use')));
        }
      })
    }),
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
        const { email } = req.admin

        if( value == email ){
          return resolve(true)
        }else{
          Admin.findOne({ 
            where: { email: value }
          })
          .then(admin => {
            if (!admin) {
              return resolve(true)
            }
  
            return reject(new Error('email already in use'));
          })
          .catch(err => reject(new Error('email already in use')));
        }
      })
    })
];

exports.validateAdminPasswords = [
  body("oldPassword")
    .notEmpty()
    .withMessage("password is required").bail()
    .isLength({ min: 6 })
    .withMessage("password is too short").bail()
    .trim()
    .escape()
    .custom((value, { req }) => {
      return new Promise((resolve, reject) => {
        const { passwordText } = req.admin
        return value == passwordText ? resolve(true) : reject(new Error('incorrect password'));
      })
    }),
  body("newPassword")
    .notEmpty()
    .withMessage("password is required").bail()
    .isLength({ min: 6 })
    .withMessage("password is too short").bail()
    .trim()
    .escape(),
  body("confirmPassword")
    .notEmpty()
    .withMessage("password is required").bail()
    .isLength({ min: 6 })
    .withMessage("password is too short").bail()
    .trim()
    .escape()
    .custom((value, { req }) => {
      return new Promise((resolve, reject) => {
        const { newPassword } = req.body
        return value == newPassword ? resolve(true) : reject(new Error('password do not match'));
      })
    })
];
