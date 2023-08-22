const { body } = require("express-validator");

const Faq = require('../../models/faq.model')

exports.validateNewFaq = [
  body("question")
    .notEmpty()
    .withMessage("question is required").bail()
    .trim()
    .escape()
    .custom(value => {
      return new Promise((resolve, reject) => {
        Faq.findOne({ 
          where: { question: value }
        })
        .then(faq => {
          if (!faq) {
            return resolve(true)
          }
  
          return reject(new Error('question already exist'));
        })
        .catch(err => reject(new Error('question already exist')));
      })
    }),
  body("answer")
    .notEmpty()
    .withMessage("answer is required").bail()
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

exports.validateExistingFaq = [
  body("question")
    .notEmpty()
    .withMessage("question is required").bail()
    .trim()
    .escape()
    .custom((value, {req}) => {
      return new Promise((resolve, reject) => {
        const {question, faqId} = req.body

        Faq.findOne({ 
          where: { question: question }
        })
        .then(faq => {
          if (!faq) {
            return resolve(true)
          }else if( faq.faqId !== +faqId ){
            return reject(new Error('question already exist'));
          }else{
            return resolve(true)
          }
        })
        .catch(err => reject(new Error('question already exist')));
      })
    }),
  body("answer")
    .notEmpty()
    .withMessage("answer is required").bail()
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
