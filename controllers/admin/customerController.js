//const customerModel = require('../../models/admin/customerModel')
var database = require('../../config/db');

const get_data = async(req, res) => {

  var draw = 2;

  var start = 0;

  var length = 10;

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
  //const search_value = req.query.search['value'];
  const search_value = 'neel';
  
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
                //res.json(output);

                res.render('admin/admin-template',{
                    viewFile: "customers/customers.ejs",
                    pageTitle : 'Customer',
                    name: req.session.name,
                    adminId: req.session.adminId,
                    session : req.session.isLoggedIn, 
                    activeMenu: "dashboard",
                    out : output
                });

            // console.log(output)
                /*
                res.render('admin/admin-template',{
                    viewFile: "customers/customers.ejs",
                    pageTitle : 'Customer',
                    name: req.session.name,
                    adminId: req.session.adminId,
                    session : req.session.isLoggedIn, 
                    activeMenu: "dashboard",
                    out : output
                }); */
          });

            /*
          try {
           
            // If the user is isLoggedIn
           // console.log(req.session.isLoggedIn)
           if(req.session.isLoggedIn) {
            //res.send('Welcome back, ' + req.session.name + '!');
           // console.log(req.session.name)
            res.render('admin/admin-template',{
                    viewFile: "customers/customers.ejs",
                    pageTitle : 'Customer',
                    name: req.session.name,
                    adminId: req.session.adminId,
                    session : req.session.isLoggedIn, 
                    activeMenu: "dashboard",
                    out : output,
                });
            } else {
                res.send('Please login to view this page!');
            }
          } catch (error) {
              console.log(error.message)   
          } */

      });

  }); 

};

module.exports = {
    get_data
  };