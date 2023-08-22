const express = require('express');

const adminController = require('../controllers/admin/adminController');
const users           = require('../controllers/admin/users')
//const useri = require('../controllers/admin/useri')
//const customer = require('../controllers/admin/customerController')
//var database = require('../config/db');

/**
 *  Middleware
 */
const {validateAdminSignin, validateAdminUpdateProfile} = require('../middlewares/validators/admin.validator');
const {isAuthenticated} = require('../middlewares/adminAuth')

const router = express.Router();

router.get('/admin/login', isAuthenticated,adminController.loginView);  /* will show admin login page */
router.post("/admin/login", validateAdminSignin,adminController.handleLogin);

// Dashboard
router.get("/admin/dashboard", isAuthenticated,adminController.loadDashboard);
router.get("/admin/logout", adminController.postLogout);

// Profile
router.get('/admin/my-profile', isAuthenticated, adminController.myProfilePage);
router.post('/admin/update-profile',  adminController.updateUserValidation,adminController.postUpdateProfile);

router.get("/admin/users", users.getUsers); /* New */
router.post("/admin/users", users.getUsers); /* New */
/*
router.get("/admin/useri", useri.getUserPage); // Data Table 
router.get("/useri", useri.getUseri); // Data Table 
router.get('/admin/useri/view/:id', useri.getUserDetails); // View user details
router.get("/admin/update-user/:id", useri.updateUserDetails);  // GET user details for Update
router.post("/admin/update-useri", useri.updateUserDetailsAction);  // GET user details for Update

router.get("/admin/useri/active_action/:id", useri.active_action);  // Active Status on Click
router.get("/admin/useri/inActive_action/:id", useri.inActive_action);  // DeActive Status on Click

router.get('/admin/useri/add-useri', useri.addFormPage);
router.post("/admin/useri/create-useri", useri.updateUseriValidation,useri.createUserDetailsAction);  // GET user details for Update
*/

//router.get('/admin/users/:id', users.getUserDetails);

// POST update user details
//router.post('/admin/users/:id', users.updateUserDetails);

/*
router.get("/admin/customer", customer.get_data);
router.post("/admin/customer", customer.get_data);
*/


/* GET home page. */
router.get('/admin/customer', function(req, res, next) {
    res.render('admin/admin-template',{
        viewFile: "customers/customers.ejs",
        pageTitle : 'Customer',
        name: req.session.name,
        adminId: req.session.adminId,
        session : req.session.isLoggedIn, 
        activeMenu: "dashboard"
    });
});

router.get('/get_data', function(req, res, next){
   
    var draw = req.query.draw;
    var start = req.query.start;
    var length = req.query.length;  
    var order_data = req.query.order;
  
    if(typeof order_data == 'undefined')
    {
        var column_name = 'customers.id';
  
        var column_sort_order = 'desc';
    }
    else
    {
        var column_index = req.query.order[0]['column'];
  
        var column_name = req.query.columns[column_index]['data'];
  
        var column_sort_order = req.query.order[0]['dir'];
    }
  
    //search data
    //console.log(req.body) 
    const search_value = req.query.search['value'];
    
    const search_query = `
     AND (firstname LIKE '%${search_value}%' 
      OR lastname LIKE '%${search_value}%' 
      OR address LIKE '%${search_value}%' 
      OR age LIKE '%${search_value}%'
     )
    `;
  
    //Total number of records without filtering
    database.query("SELECT COUNT(*) AS Total FROM customers", function(error, data){
  
        var total_records = data[0].Total;
        //Total number of records with filtering
  
        database.query(`SELECT COUNT(*) AS Total FROM customers WHERE 1 ${search_query}`, function(error, data){
  
            var total_records_with_filter = data[0].Total;
  
            var query = `
            SELECT * FROM customers 
            WHERE 1 ${search_query} 
            ORDER BY ${column_name} ${column_sort_order} 
            LIMIT ${start}, ${length}
            `;
          
            var data_arr = [];
  
            database.query(query, function(error, data){
                data.forEach(function(row){
                    data_arr.push({
                        'firstname' : row.firstname,
                        'lastname' : row.lastname,
                        'address' : row.address,
                        'age' : row.age
                    });
                  });
  
                  const output = {
                    'draw' : draw,
                    'iTotalRecords' : total_records,
                    'iTotalDisplayRecords' : total_records_with_filter,
                    'aaData' : data_arr
                  };
                  res.json(output);                 
            });    
        });  
    });   
  });



/*
router.get('/admin/registration', adminController.registrationView);
router.post('/addUserAction', adminController.addUserAction);

router.get('/admin/my-profile', isAuthenticated, adminController.myProfilePage);
router.post('/admin/update-profile',  adminController.postUpdateProfile);

router.get('/admin/icons', isAuthenticated, adminController.iconsView);
*/

//Page Not found
router.get("*", function(req,res){
    res.redirect('/admin/login')
})

module.exports = {
    routes : router
}