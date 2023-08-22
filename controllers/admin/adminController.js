const adminModel = require("../../models/admin/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, check, validationResult } = require("express-validator");
const responseStatus = require("../../utils/response-status");
const randomstring = require('randomstring');
const config = require('../../config/config')
const nodemailer = require("nodemailer")

const securePassword = async(password)=>{
  try {
    const passwordHash = await bcrypt.hash(password,10);
    return passwordHash
  } catch (error) {
    console.log(error.message)    
  }
}


//function to use for send email
const sendEmail = async(name,email,token)=>{
  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      host : 'smtp.office365.com',
      port : 587,
      secure : false,
      requireTLS :true,
      auth :{
        user : config.emailUser,
        pass : config.emailPassword
      }
    });
    
    const mailOptions = {
      from : config.emailUser,
      to : email,
      subject : 'For reset password',
      html : '<p>Hello '+name+', please click here <a href="http://localhost:3000/admin/forget-password?token='+token+'">Reset</a> your password.<p>'
    };

    transporter.sendMail(mailOptions,function(error,info){
      if(error){
        console.error('Error sending email:', error);
      } else {
        console.log("Email has been sent :- ",info.response)
      }
    })
    
  } catch (error) {
    console.log(error)
  }

}

const indexView = (req, res, next) => {
  res.render("admin/admin-template", {
    pageTitle: "DASHBOARD",
    //    viewFile:"admin/add-user",
    activeMenu: "dashboard",
    //    scriptFile:"user"
  });
};
/*
const iconsView = (req, res, next)=>{
    res.render('admin/icons',{ 
        title : 'Icons',
        pageTitle : 'ICONS',
    //    viewFile:"admin/add-user", 
        activeMenu: "icons", 
     });
} */

/**
 *  View Icons
 */
const iconsView = (req, res, next) => {
  res.render("admin/dashboard", {
    viewFile: "admin/icons.ejs",
    //scriptFile: "assets/utility/js/accounts.js",
    pageTitle: "My ICONS",
    activeMenu: "icons",
    name: req.session.name,
    adminId: req.session.adminId,
    email: req.session.email,
    username: req.session.username,
    session: req.session.isLoggedIn,
  });
};

/*
const registrationView = (req, res, next)=>{
    res.render('admin/register',{
        pageTitle : 'ADMIN USER REGISTRATION'
     });
}

const addUserAction = async(req, res)=>{
    //console.log(req.body);
    //const userData = await adminModel.checkEmailUser(req.body.email);
    const userData = await adminModel.findOne({ email: req.body.email });
   // console.log(userData);
    if(userData === false) {
    //hash user's password
        if(req.body.name && req.body.username && req.body.email && req.body.password)
        {
            
            const salt = bcrypt.genSaltSync(10);
            const data = {
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                passwordEncrypted: bcrypt.hashSync(req.body.password, salt),
                passwordText: req.body.password,
                createdAt :  new Date()
            };
          //  console.log(req.body.email);
            const successMsg = await adminModel.createNewUser(data);

            // Generate JWT Token 
            const userDetail = await adminModel.findUserByEmail(req.body.email);
            const token = jwt.sign({userID : userDetail.adminId}, process.env.JWT_SECRET_KEY, {expiresIn:'5d'})

            if(successMsg)
            {
                res.render('admin/register',{message : 'Data Successfully inserted',"token": token})
            //    res.send({"status" : "successs","message" : "registration success", "token": token})
            }
        } else {
            res.render('admin/register',{message : 'All Fields Required'})
        }
    } else {
        res.render('admin/register',{message : 'Email already registered'})
    }
}
*/

const loginView = (req, res, next) => {
  res.render("admin/login", {
    pageTitle: "ADMIN LOGIN",
    scriptFile: "login",
  });
};

const handleLogin = (req, res, next) => {
  // const username = req.body.username;
  //  console.log(req.body);

  const { username, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  adminModel
    .findOne({
      where: { username: username },
      raw: true,
    })
    .then((admin) => {
      if (!admin) {
        return res.status(401).json({
          status: responseStatus.ALERT,
          title: "Failure",
          icon: "error",
          message: "Invalid username",
        });
      }

      const {
        adminId,
        passwordEncrypted,
        status,
        email,
        username,
        role,
        name,
      } = admin;
      if (status == "deactive") {
        return res.status(401).json({
          status: responseStatus.ALERT,
          title: "Failure",
          icon: "error",
          message:
            "Your account has been suspended. Contact support team to reactivate",
        });
      }
      //console.log(password);
      //console.log(passwordEncrypted);
      //if(bcrypt.compare(password, passwordEncrypted)) { console.log('user loggedin',username) }

      bcrypt
        .compare(password, passwordEncrypted)
        .then((doMatch) => {
          if (doMatch) {
            const token = jwt.sign(
              { userID: adminId },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "5d" }
            );

            req.session.isLoggedIn = true;
            req.session.adminId = adminId;
            req.session.role = role;
            req.session.email = email;
            req.session.username = username;
            req.session.name = name;
            //console.log(req.session);
            // console.log("SignIn successfull -","Token : "+token);

            req.session.save((err) => {
              return res.status(200).json({
                isRedirect: true,
                redirectUrl: "admin/dashboard",
                icon: "success",
                title: "Logged In",
                message: "Successfull",
              });
            });
          } else {
            return res.status(401).json({
              status: responseStatus.ALERT,
              title: "Failure",
              icon: "error",
              message: "Invalid Username or Password",
            });
          }
        })
        .catch((err) => {
          //console.log(err);
          // console.log("password not matched");

          res.status(401).json({
            status: responseStatus.ALERT,
            title: "Failure",
            icon: "error",
            message: "Username or Password did not match",
          });
        });
    })
    .catch((err) => {
      res.status(401).json({
        status: responseStatus.ALERT,
        alertTitle: "Failure",
        alertIcon: "error",
        alertText: "username is incorrect",
      });
    });

  /*    try {
       
        const email = req.body.email
        const password = req.body.password

        if(email && password){
            const userData = await adminModel.findUserByEmail(email);
            //console.log(userData.email)
            if(userData) {
                const isMatch = await adminModel.compareUserPassword(password,userData.passwordEncrypted)
                
             //   console.log(userData.email)
                if((userData.email === email) && isMatch === true)
                {
                    req.session.isLoggedIn = true;
                    req.session.adminId = userData.adminId
                    req.session.name = userData.name
                    req.session.email = userData.email
                    req.session.username = userData.username
                //    session=req.session
               //     console.log(req.session)
                    res.redirect('/admin/dashboard')
                } else {
                    res.render('admin/login',{"status":"failed",message : "Email and password is incorrect"})
                }

            } else {
                res.render('admin/login',{"status":"failed",message : "You are not a registered user"})
            }

        } else {            
            res.render('admin/login',{"status":"error",message : "All fields are required"})
        }
    } catch (error) {
        console.log(error.msg);
    } */
};

const loadDashboard = async (req, res) => {
  try {
    // If the user is isLoggedIn
    // console.log(req.session.isLoggedIn)
    if (req.session.isLoggedIn) {
      //res.send('Welcome back, ' + req.session.name + '!');
      // console.log(req.session.name)
      res.render("admin/admin-template", {
        viewFile: "dashboard",
        pageTitle: "DASHBOARD",
        name: req.session.name,
        adminId: req.session.adminId,
        session: req.session.isLoggedIn,
        activeMenu: "dashboard",
      });
    } else {
      response.send("Please login to view this page!");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const postLogout = async (req, res) => {
  try {
    req.session.destroy();
    res.redirect("/admin/login");
  } catch (error) {
    console.log(error.message);
  }
};

/**
 *  View Profile
 */
const myProfilePage = (req, res, next) => {
  res.render("admin/admin-template", {
    viewFile: "account/my-profile.ejs",
    scriptFile: "accounts",
    pageTitle: "My Profile",
    activeMenu: "my-profile",
    name: req.session.name,
    adminId: req.session.adminId,
    email: req.session.email,
    username: req.session.username,
  });
};

/**
 *  POST Requests
 */

const updateUserValidation = [
  body("name").notEmpty().withMessage("name is required").trim().escape(),
  body("username")
    .notEmpty()
    .withMessage("username is required")
    .bail()
    .isLength({ min: 6 })
    .withMessage("username is too short")
    .bail()
    .trim()
    .escape()
    .custom((value, { req }) => {
      return new Promise((resolve, reject) => {
        const { username } = req.admin;

        if (value == username) {
          return resolve(true);
        } else {
          adminModel
            .findOne({
              where: { username: value },
            })
            .then((admin) => {
              if (!admin) {
                return resolve(true);
              }

              return reject(new Error("username already in use"));
            })
            .catch((err) => reject(new Error("username already in use")));
        }
      });
    }),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .bail()
    .isEmail()
    .withMessage("email is incorrect")
    .bail()
    .normalizeEmail()
    .trim()
    .escape()
    .custom((value, { req }) => {
      return new Promise((resolve, reject) => {
        const { email } = req.admin;

        if (value == email) {
          return resolve(true);
        } else {
          adminModel
            .findOne({
              where: { email: value },
            })
            .then((admin) => {
              if (!admin) {
                return resolve(true);
              }

              return reject(new Error("email already in use"));
            })
            .catch((err) => reject(new Error("email already in use")));
        }
      });
    }),
];

/*
const updateUserValidation = [
  check('name', 'Enter name')
  .not().isEmpty().trim().escape(),
  check('username', 'Enter User name')
  .not().isEmpty().trim().escape(),
  check('mobile', 'Must Be an valid mobile number').not().isEmpty().trim().escape(),
  check('status', 'Select Status')
  .not().isEmpty().trim().escape(),
];
*/

const postUpdateProfile = async (req, res) => {
  const { name, email, username } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  adminModel
    .findOne({
      where: { adminId: req.admin.adminId },
    })
    .then((admin) => {
      if (!admin) {
        return res.status(422).json({
          status: responseStatus.ALERT,
          alertTitle: "Failure",
          alertIcon: "error",
          alertText: "Something went wrong..",
        });
      }

      admin.name = name;
      admin.username = username;
      admin.email = email;
      return admin.save();
    })
    .then((result) => {
      return res.status(200).json({
        isRedirect: true,
        redirectUrl: "admin/dashboard",
        title: "Success",
        icon: "success",
        message: "Your profile has been updated successfully",
      });
    })
    .catch((err) => {
      return res.status(422).json({
        status: responseStatus.ALERT,
        alertTitle: "Failure",
        alertIcon: "error",
        alertText: "Something went wrong..",
      });
    });
};

/*
 const postUpdateProfile = async (req,res)=>{

 const { name, email, username } = req.body
//  console.log(req.body);
  
  const errors = validationResult(req);
  const extractedErrors = []

  if(!errors.isEmpty()){
   // console.log(errors);
    errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }))
  }
  
  if ( extractedErrors.length > 0 ) {
    return res.status(422).json({
      status: responseStatus.VALIDATION_ERRORS,
      errors: extractedErrors
    });
  }

  adminModel.findOne({ 
    where: { adminId: req.admin.adminId }
  })
  .then(admin => {
    if (!admin) {      
      return res.status(422).json({
        status: responseStatus.ALERT,
        alertTitle: "Failure",
        alertIcon: "error",
        alertText: "Something went wrong.."
      })
    }
    
    admin.name = name;
    admin.username = username;
    admin.email = email;
    return admin.save()
  })
  .then(result => {
    return res.status(200).json({
      isRedirect:true,
      redirectUrl:"dashboard",
      title:"Success",
      icon:"success",
      message: "Your profile has been updated successfully"
    })
  })
  .catch(err => {    
    return res.status(422).json({
      status: responseStatus.ALERT,
      alertTitle: "Failure",
      alertIcon: "error",
      alertText: "Something went wrong.."
    })
  });
};
*/

const loadChat = async (req, res) => {
  try {
    // If the user is isLoggedIn
    // console.log(req.session.isLoggedIn)
    if (req.session.isLoggedIn) {
      //res.send('Welcome back, ' + req.session.name + '!');
      // console.log(req.session.name)
      res.render("admin/admin-template", {
        viewFile: "chat",
        pageTitle: "DASHBOARD",
        name: req.session.name,
        adminId: req.session.adminId,
        session: req.session.isLoggedIn,
        activeMenu: "dashboard",
      });
    } else {
      response.send("Please login to view this page!");
    }
  } catch (error) {
    console.log(error.message);
  }
};

//forget password
const forgetLoad = async (req, res) => {
  try {
    //res.render('forget')
    res.render("admin/forget", {
      pageTitle: "ADMIN LOGIN",
      scriptFile: "login",
    });
    
  } catch (error) {
    console.log(error.message)    
  }
}

const forgetVerifyPassword = async (req, res) => {
  try {
  const email = req.body.email
  const userData = await adminModel.findOne({ where: { email: email } })
  if(userData) {
      const randomString = randomstring.generate()
    // const updatedData = await adminModel.updateOne({email:email},{$set:{randomString}})
    const updatedData = await adminModel.update(
      {token: randomString,}, 
      {where: { email: email }, }
      );
      //console.log(`Updated rows: ${updatedData}`);
      sendEmail(userData.name,userData.email,randomString)
      //console.log(isMailSent) 
      res.render('admin/forget',{ message:"Please check your email to reset password "})      
  } else {
     res.render('admin/forget',{message:"User Email is incorrect"})
  }    
  } catch (error) {
    console.log(error.message)    
  }
}

const forgetPasswordLoad = async (req,res) => {
  
  try {
    const token = req.query.token
    const tokenData = await adminModel.findOne({ where: { token: token } })
    if(tokenData) {
      res.render('admin/forget-password',{ adminId : tokenData.adminId})
    } else { 
      res.render('admin/404',{message:"Token Invalid"})
    }    
  } catch (error) {
    console.log(error.message)    
  }
}

const resetPassword = async (req,res) => {  
  try {
    const password = req.body.password
    const adminId  = req.body.adminId
    
    const salt = bcrypt.genSaltSync(10);
    const passwordEncrypted = bcrypt.hashSync(password, salt);

    const updatePasswordData = await adminModel.update(
      { passwordText : password, passwordEncrypted : passwordEncrypted }, 
      { where : { adminId : adminId }, }
      );
   
      res.render('admin/forget', { message : "Password has been changed" })     
    //  console.log(`Updated rows: ${updatePasswordData}`);    
  } catch (error) {      
    console.log(error.message)        
  } 
}

module.exports = {
  indexView: indexView,
  iconsView: iconsView,
  loginView: loginView,
  //    registrationView : registrationView,
  //   addUserAction : addUserAction,
  handleLogin: handleLogin,
  loadDashboard: loadDashboard,
  postLogout: postLogout,
  myProfilePage: myProfilePage,
  postUpdateProfile: postUpdateProfile,
  updateUserValidation: updateUserValidation,
  loadChat: loadChat,
  forgetLoad :forgetLoad,
  forgetVerifyPassword : forgetVerifyPassword,
  forgetPasswordLoad: forgetPasswordLoad,
  resetPassword : resetPassword
};
