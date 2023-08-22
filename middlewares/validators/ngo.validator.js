const { body } = require("express-validator");

const Nogs = require('../../models/ngo.model')
const Cause = require('../../models/cause.model')

const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/g;

exports.validateNewNgo = [
  body("name")
    .notEmpty()
    .withMessage("name is required").bail()
    .trim()
    .escape()
    .custom(value => {
      return new Promise((resolve, reject) => {
        Nogs.findOne({ 
          where: { name: value }
        })
        .then(ngo => {
          if (!ngo) {
            return resolve(true)
          }
  
          return reject(new Error('name already exist'));
        })
        .catch(err => reject(new Error('name already exist')));
      })
    }),
  body("slug")
    .notEmpty()
    .withMessage("slug is required").bail()
    .trim()
    .escape()
    .isSlug()
    .withMessage("slug is incorrect").bail()
    .custom(value => {
      return new Promise((resolve, reject) => {
        Nogs.findOne({ 
          where: { slug: value }
        })
        .then(ngo => {
          if (ngo) {
            return reject(new Error('slug is in use'));
          }
          // else if( !SLUG_REGEX.test(value)){
          //   return reject(new Error('slug is incorrect'));
          // }

          return resolve(true)
        })
        .catch(err => reject(new Error('slug already exist')));
      })
    }),
  body("causeId")
    .notEmpty()
    .withMessage("select option").bail()
    .trim()
    .escape()
    .custom(value => {
      return new Promise((resolve, reject) => {
        Cause.findOne({ 
          where: { causeId: value }
        })
        .then(cause => {
          if (cause) {
            return resolve(true)
          }
  
          return reject(new Error('incorrect option'));
        })
        .catch(err => reject(new Error('incorrect option')));
      })
    }),
  body("description")
    .notEmpty()
    .withMessage("description is required").bail()
    .trim()
    .escape(),
  body("location")
    .trim()
    .escape(),
  body("quote")
    .trim()
    .escape(),
  body("donation")
    // .isNumeric().withMessage('incorrect value')
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

exports.validateExistingNgo = [
  body("name")
    .notEmpty()
    .withMessage("name is required").bail()
    .trim()
    .escape()
    .custom((value, {req}) => {
      return new Promise((resolve, reject) => {
        const { ngoId } = req.body

        Nogs.findOne({ 
          where: { name: value }
        })
        .then(ngo => {
          if( !ngo ){
            return resolve(true)
          }else if ( ngo && (ngo.ngoId == +ngoId) ) {
            return resolve(true)
          }
  
          return reject(new Error('name already exist'));
        })
        .catch(err => reject(new Error('name is invalid')));
      })
    }),
  body("slug")
    .notEmpty()
    .withMessage("slug is required").bail()
    .trim()
    .escape()
    .isSlug()
    .withMessage("slug is incorrect").bail()
    .custom((value, {req}) => {
      return new Promise((resolve, reject) => {
        const { ngoId } = req.body

        Nogs.findOne({ 
          where: { slug: value }
        })
        .then(ngo => {
          if ( ngo && ngo.ngoId !== +ngoId ) {
            return reject(new Error('slug is in use'));
          }
          return resolve(true)
        })
        .catch(err => reject(new Error('slug is invalid')));
      })
    }),
  body("causeId")
    .notEmpty()
    .withMessage("Select option").bail()
    .trim()
    .escape()
    .custom(value => {
      return new Promise((resolve, reject) => {
        Cause.findOne({ 
          where: { causeId: value }
        })
        .then(cause => {
          if (cause) {
            return resolve(true)
          }
  
          return reject(new Error('incorrect option'));
        })
        .catch(err => reject(new Error('incorrect option')));
      })
    }),
  body("description")
    .notEmpty()
    .withMessage("description is required").bail()
    .trim()
    .escape(),
  body("location")
    .trim()
    .escape(),
  body("quote")
    .trim()
    .escape(),
  body("donation")
    // .isNumeric().withMessage('incorrect value')
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