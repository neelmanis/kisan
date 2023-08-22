const User = require('../../models/admin/useri')
const { Sequelize,Op } = require('sequelize');
const { body,check,validationResult } = require('express-validator');

const getUserPage = (req, res, next) => {
  res.render('admin/admin-template',{
   viewFile: "users/useri.ejs",
   scriptFile: "accounts",
   pageTitle: "Useri",
   activeMenu: "my-profile",
   name: req.session.name,
   adminId: req.session.adminId,
   email: req.session.email,
   username: req.session.username
});
};

// GET /users
/*
const getUseri = async (req, res) => {
  
    try {
      
    const { draw, start, length, search, order, columns } = req.query;
     
    // Construct the filter
    const filter = search && search.value ? { name: { [Sequelize.Op.like]: `%${search.value}%` } } : {};

    // Construct the sorting
    const sortColumn = columns[order[0].column].data;
    const sortOrder = order[0].dir.toUpperCase();

    // Construct the pagination
    const page = Math.floor(start / length);
    const pageSize = length;

    // Fetch the filtered, sorted, and paginated users
    const { count, rows } = await User.findAndCountAll({
      where: filter,
      order: [[sortColumn, sortOrder]],
      offset: page * pageSize,
      limit: 10,
    });

    res.json({
      draw: parseInt(draw),
      recordsTotal: count,
      recordsFiltered: count,
      data: rows,
    });

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server errors' });
  }
}; */

const getUseri = async (req, res) => {
 // console.log(req.query)
 // console.log(req.query.columns)
  try {
 
  const { draw, start, length, search, order, columns } = req.query;
  const { status } = req.query; // Retrieve the status filter value 
  
  // Enable logging to print the generated SQL query
  const logger = (query) => {
    console.log(query);
  };

  // Construct the filter
  const filter = search && search.value ? { name: { [Sequelize.Op.like]: `%${search.value}%` } } : {};
  if (status && status !== 'all') { // Apply the status filter if selected
    filter.status = status;
  }

  // Construct the sorting
  const sortColumnIndex = order[0].column; // Get the column index
  const sortColumn = columns[sortColumnIndex].data;
  const sortOrder = order[0].dir.toUpperCase();
  // Construct the pagination
  const page = Math.floor(start / length);
  const pageSize = length;

  // Fetch the filtered, sorted, and paginated users
  const { count, rows } = await User.findAndCountAll({
    where: filter,
    order: [[sortColumn, sortOrder]],
    offset: page * pageSize,
    limit: 10,
  //  logging: logger,
  });
  //console.log(options)
  
  // Map the data to the DataTables format with column definitions
  const data = rows.map(user => {
    let id, name, email, status;

    if (user.id) {
      id = user.id;
    }
  
    if (user.name) {
      name = user.name;
    }
  
    if (user.email) {
      email = user.email;
    }

    if (user.status) {
      if(user.status == "1"){
       status = `<a class="badge bg-success" href="/useri/active_action/${user.id}" onclick="return(window.confirm(\'Are you sure you want to DeActive?\'));">ACTIVE</a>`; 
    }else{
      status = `<a class="badge bg-danger" href="/useri/inActive_action/${user.id}" onclick="return(window.confirm(\'Are you sure you want to Active?\'));">DEACTIVE</a>`;
    }
    }
    
    actions = `<a href="/useri/view/${user.id}" class="btn btn-primary">View</a> | <a href="/useri/update-user/${user.id}" class="btn btn-info">Edit</a>`;
    return { id, name, email, status, actions};

    //actions: `<a href="useri/view/${user.id}" class="btn btn-primary">View</a> | <a href="/admin/update-user/${user.id}" class="btn btn-info">Edit</a>`,    
    });

  res.json({
    draw: parseInt(draw),
    recordsTotal: count,
    recordsFiltered: count,
    data: data,
  });

} catch (error) {
  console.log(error)
  res.status(500).json({ error: 'Internal server errors..' });
}
};



// GET /users/:id Details
const getUserDetails = async (req, res) => {
  const userId = req.params.id; // Get the user ID from the route parameter

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    //res.json(user);
    res.render('admin/admin-template',{
      viewFile: "users/useriDetail.ejs",
      pageTitle : 'Users',
      user,
      name : req.session.name,
      adminId : req.session.adminId,
      session : req.session.isLoggedIn, 
      activeMenu: "dashboard",
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 *  View User details
 */
const updateUserDetails = async (req, res, next) => {

  const userId = req.params.id; // Get the user ID from the route parameter

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

  res.render('admin/admin-template',{
   viewFile: "users/update-useri.ejs",
   scriptFile: "useri",
   pageTitle: "Users",
   user,
   activeMenu: "my-profile",
   name: req.session.name,
   adminId: req.session.adminId,
   email: req.session.email,
   username: req.session.username
  });
} catch (error) {
  res.status(500).json({ error: 'Internal server error' });
}
};

// Update the user details
const updateUserDetailsAction = async (req, res) => {
  //console.log(req.body)
  const userId = req.body.userId; // Get the user ID from the route parameter 
  const { name, email } = req.body;

  try {
    const user = await User.findByPk(userId);
  
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
   
    // Check if the updated email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser && existingUser.id !== user.id) {
      return res.status(401).json({       
        title: "Failure",
        icon: "error",
        message: "Email already exists"
      })  
    }

    //console.log(req.body)
    // Update user details
    //user.name = name;
    //user.email = email;
    try {
      user.name = name;
      user.email = email;
      const saveUser =  await user.save();
      return res.status(200).json({
        isRedirect:true,
        redirectUrl:"useri",
        title:"Success",
        icon:"success",
        message: "Your Details has been updated successfully"
      })
    //  console.log(saveUser); //when success it print.
    } catch (err) {
  //  console.log('err' + err);
    res.status(500).send(err);
    }

    //res.redirect(`/users/${userId}`);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const active_action = async (req, res) => {
  const userId = req.params.id; // Get the user ID from the route parameter
 
  try {
    const user = await User.findByPk(userId);  
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
 
    try {
      user.status = '0';
      const saveUser =  await user.save();
      res.redirect(`${nodeSiteUrl}./useri`);
    } catch (err) {
  //  console.log('err' + err);
    res.status(500).send(err);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }  
}

const inActive_action = async (req, res) => {
  const userId = req.params.id; // Get the user ID from the route parameter
 
  try {
    const user = await User.findByPk(userId);  
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
 
    try {
      user.status = '1';
      const saveUser =  await user.save();
      res.redirect(`${nodeSiteUrl}./useri`);
    } catch (err) {
  //  console.log('err' + err);
    res.status(500).send(err);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }  
}


// Create Details
const addFormPage = async (req, res) => {
res.render('admin/admin-template',{
  viewFile: "users/create-useri.ejs",
  scriptFile: "useri",
  pageTitle: "Users",
  name : req.session.name,
  adminId : req.session.adminId,
  session : req.session.isLoggedIn, 
  activeMenu: "useri",
});
};

const updateUseriValidation = [
  body("name")
    .notEmpty()
    .withMessage("name is required")
    .trim()
    .escape(),
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
          User.findOne({ 
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

// create the user details

const createUserDetailsAction = async (req, res) => {
const { name, email } = req.body;

const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(422).json({ errors: errors.array() });
}
  //console.log(req.params.name)
  try {
    // Check if the updated email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser && existingUser.email !== User.email) {
      return res.status(401).json({       
        title: "Failure",
        icon: "error",
        message: "Email already exists"
      })  
    }

    try {
      const data = {
        name: req.body.name,
        email: req.body.email,
        status: '1',
        createdAt :  new Date()
    };
      
    const successMsg = await User.create(data);
      return res.status(200).json({
        isRedirect:true,
        redirectUrl:"admin/useri",
        title:"Success",
        icon:"success",
        message: "Your Details has been updated successfully"
      })
      
    //  console.log(saveUser); //when success it print.
    } catch (err) {
   console.log('err' + err);
  //  res.status(500).send(err);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

/*
const createUserDetailsAction = async (req, res) => {
  const { name, email } = req.body;
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  } else {
   // console.log('no error')
   // Check if the updated email already exists
   const existingUser = await User.findOne({ where: { email } });
   if (existingUser && existingUser.email !== User.email) {
     return res.status(401).json({       
       title: "Failure",
       icon: "error",
       message: "Email already exists"
     })  
   } else {
    const data = {
      name: req.body.name,
      email: req.body.email,
      status: '1',
      createdAt :  new Date()
     };
    
    const successMsg = await User.create(data);
    return res.status(200).json({
      isRedirect:true,
      redirectUrl:"admin/useri",
      title:"Success",
      icon:"success",
      message: "Your Details has been updated successfully"
    })
   }
  }
}
*/

module.exports = {
  getUserPage : getUserPage,
  getUseri : getUseri,
  getUserDetails : getUserDetails,
  updateUserDetails : updateUserDetails,
  updateUserDetailsAction : updateUserDetailsAction,
  active_action : active_action,
  inActive_action : inActive_action,
  addFormPage : addFormPage,
  updateUseriValidation : updateUseriValidation,
  createUserDetailsAction : createUserDetailsAction
}