const { body } = require("express-validator");

const Cause = require('../../models/cause.model')

exports.validateNewCause = [
  body("name")
    .notEmpty()
    .withMessage("name is required").bail()
    .trim()
    .escape()
    .custom(value => {
      return new Promise((resolve, reject) => {
        Cause.findOne({ 
          where: { name: value }
        })
        .then(cause => {
          if (!cause) {
            return resolve(true)
          }
  
          return reject(new Error('name already in use'));
        })
        .catch(err => reject(new Error('name already in use')));
      })
    }),
  body("status")
    .notEmpty()
    .withMessage("status is required").bail()
    .isIn(['active','deactive'])
    .withMessage("status is incorrect").bail()
    .trim()
    .escape()
];

exports.validateExistingCause = [
  body("name")
    .notEmpty()
    .withMessage("name is required").bail()
    .trim()
    .escape()
    .custom((value, {req}) => {
      return new Promise((resolve, reject) => {
        const {name, causeId} = req.body

        Cause.findOne({ 
          where: { name: name }
        })
        .then(cause => {
          if (!cause) {
            return resolve(true)
          }else if( cause.causeId !== +causeId ){
            return reject(new Error('name already in use'));
          }else{
            return resolve(true)
          }
        })
        .catch(err => reject(new Error('name already in use')));
      })
    }),
  body("status")
    .notEmpty()
    .withMessage("status is required").bail()
    .isIn(['active','deactive'])
    .withMessage("status is incorrect").bail()
    .trim()
    .escape()
];
