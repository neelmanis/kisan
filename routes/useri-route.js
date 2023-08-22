const express = require('express');
const router = express.Router(); 

/**
 *  Controllers
 */
 const useri = require('../controllers/admin/useri');

 /**
 *  Middleware
 */
//const {isAuthenticated} = require('../middleware/is-auth');
//const {validateNewFaq, validateExistingFaq} = require('../middleware/validators/faq.validator');
/*
router.get('/list', useriController.faqListingPage);
router.post('/create', useriController.postCreateFaq);
router.post('/update', useriController.postUpdateFaq); */

router.get("/", useri.getUserPage); // Data Table 
router.get("/fetch", useri.getUseri); // Data Table 
router.get('/view/:id', useri.getUserDetails); // View user details
router.get("/update-user/:id", useri.updateUserDetails);  // GET user details for Update
router.post("/update-useri", useri.updateUserDetailsAction);  // GET user details for Update

router.get("/active_action/:id", useri.active_action);  // Active Status on Click
router.get("/inActive_action/:id", useri.inActive_action);  // DeActive Status on Click

router.get('/add-useri', useri.addFormPage);
router.post("/create-useri", useri.updateUseriValidation,useri.createUserDetailsAction);  // GET user details for Update

module.exports = router;