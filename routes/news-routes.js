const fs = require('fs');
const multer = require('multer');
const express = require('express');
const router = express.Router(); 

/**
 *  Controllers
 */
 const news = require('../controllers/admin/newsController');

 /**
 *  Middleware
 */
//const {isAuthenticated} = require('../middleware/is-auth');
//const {validateNewFaq, validateExistingFaq} = require('../middleware/validators/faq.validator');

/**
 *  File Upload
 */
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      const d = new Date();
      let filepath = './uploads/news';
      try {
        if (!fs.existsSync(filepath)) {
          fs.mkdirSync(filepath, { recursive: true })
        }
        cb(null, filepath);
      } catch(e) {
        console.log("Error: pic upload")
      }
    },
    filename: function (req, file, cb) {
      const fileExtension  = file.mimetype.split('/')[1];
      const fileName = `${file.fieldname}_${Date.now()}`;
      req.fileName = fileName
      cb(null, `${fileName}.${fileExtension}`);  
    }
  });
  
  const uploadPic = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      if(file){
        if(
          !(
            file.mimetype == "image/png" || 
            file.mimetype == "image/jpg" || 
            file.mimetype == "image/jpeg"
          )
        ){
          cb(null,false);
          req.fileError = 'Only .png, .jpg and .jpeg format allowed!'
        }else{
          cb(null, true);  
        }
      }else{
        cb(null,false);
        req.fileError = 'file required'
      } 
    }
  }).fields([
    {name:"photo", maxCount:1},
  ]);

const upload = multer()

router.get("/", news.getNewsPage); // Data Table 
router.get("/fetch", news.getNews); // Data Table 
router.get('/add-news',  news.addFormPage);
router.post("/create-news", uploadPic, news.updateNEWSValidation,news.createNewsAction);  // GET user details for Update
router.get("/active_action/:id", news.active_action);  // Active Status on Click
router.get("/inActive_action/:id", news.inActive_action);  // DeActive Status on Click
router.get('/view/:id', news.getNewsDetails); // View news details

/*
router.get('/useri/view/:id', useri.getUserDetails); // View user details
router.get("/update-user/:id", useri.updateUserDetails);  // GET user details for Update
router.post("/update-useri", useri.updateUserDetailsAction);  // GET user details for Update

router.get("/active_action/:id", useri.active_action);  // Active Status on Click
router.get("/inActive_action/:id", useri.inActive_action);  // DeActive Status on Click

router.get('/add-useri', useri.addFormPage);
router.post("/create-useri", useri.updateUseriValidation,useri.createUserDetailsAction);  // GET user details for Update
*/
module.exports = router;