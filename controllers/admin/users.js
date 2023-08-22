const { Op } = require('sequelize');
const User = require("../../models/admin/userModel");

// Example pagination function
async function getUsers(req, res) {
  const page = parseInt(req.query.page) || 1; // Get the page number from the query parameters
  const limit = parseInt(req.query.limit) || 10; // Get the limit from the query parameters
  //const search = req.query.search || ''; // Get the search keyword from the query parameters
  //const filterAge = req.query.filterAge || null; // Get the age filter from the query parameters
  const search = req.body.search || ''; // POST the search keyword from the request body
  const filterAge = req.body.filterAge || null; // POST the age filter from the request body
  
  const sortField = req.query.sortField || 'name'; // Get the sort field from the query parameters
  const sortOrder = req.query.sortOrder || 'ASC'; // Get the sort order from the query parameters

  const offset = (page - 1) * limit;

  const where = {
    [Op.or]: [
      { name: { [Op.like]: `%${search}%` } },
      { email: { [Op.like]: `%${search}%` } },
    ],
  };

  if (filterAge) {
    where.age = filterAge;
  }

  try {
    const result = await User.findAndCountAll({
      where,
      offset,
      limit,
      order: [[sortField, sortOrder]],
    //  logging: console.log, // Log the generated SQL query Un Comment
    });

    const users = result.rows;
    const total = result.count;
    const totalPages = Math.ceil(total / limit);

    //res.render('users', { users, total, totalPages, currentPage: page, limit });

    res.render('admin/admin-template',{
      viewFile: "users/users.ejs",
      pageTitle : 'Users',
      name : req.session.name,
      adminId : req.session.adminId,
      session : req.session.isLoggedIn, 
      activeMenu: "dashboard" ,
      totalPages :totalPages,
      currentPage: page,
      users,
      total,
      limit ,
      search,
      filterAge,
      sortField,
      sortOrder,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


// Display the user details
async function getUserDetails(req, res) {
  const userId = req.params.id; // Get the user ID from the route parameter

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

   // res.render('userDetails', { user });
    res.render('admin/admin-template',{
      viewFile: "users/usersDetail.ejs",
      pageTitle : 'Users',
      user,
      name : req.session.name,
      adminId : req.session.adminId,
      session : req.session.isLoggedIn, 
      activeMenu: "dashboard",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


// Update the user details
async function updateUserDetails(req, res) {
  const userId = req.params.id; // Get the user ID from the route parameter
  const { name, email, age } = req.body;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.name = name;
    user.email = email;
    user.age = age;

    await user.save();

    res.redirect(`/users/${userId}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  getUsers,
  getUserDetails,
  updateUserDetails
};


/*const { Op } = require("sequelize");
const User = require("../../models/admin/userModel");

// GET /users route handler
exports.getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, filter, groupBy, sortBy, search } = req.query;

    // Build the filter object
    const filterObj = {};
    if (filter) {
      filterObj.country = filter;
    }

    // Build the search query
    const searchQuery = search ? { name: { [Op.like]: `%${search}%` } } : {};

    // Build the grouping object
    const groupByObj = groupBy ? [groupBy] : null;

    // Build the sorting object
    const sortObj = sortBy ? [sortBy.startsWith('-') ? sortBy.slice(1) : sortBy] : null;
    const sortOrder = sortBy && sortBy.startsWith('-') ? 'DESC' : 'ASC';

    // Pagination
    const startIndex = (page - 1) * limit;

    // Query the database
    const users = await User.findAll({
      where: { ...filterObj, ...searchQuery },
      attributes: groupByObj,
      order: sortObj ? [sortObj, ['id', sortOrder]] : null,
      limit: +limit,
      offset: startIndex,
    });

    const totalUsers = await User.count({
      where: { ...filterObj, ...searchQuery },
      distinct: true,
      col: groupByObj,
    });


    res.render('admin/admin-template',{
      viewFile: "users/users.ejs",
      pageTitle : 'Users',
      name : req.session.name,
      adminId : req.session.adminId,
      session : req.session.isLoggedIn, 
      activeMenu: "dashboard" ,
      totalPages : Math.ceil(totalUsers / limit),
      currentPage: page,
      users: users.rows
    });
    

  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

*/
/*
const getUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Current page number
  const limit = parseInt(req.query.limit) || 10; // Number of records per page
  const offset = (page - 1) * limit; // Offset to skip records for pagination
  const filter = req.query.filter || ""; // Filter keyword to search for

  const users = await User.findAndCountAll({
    where: {
      // Apply filter to search for users whose name or email contains the filter keyword
      [Op.or]: [
        {
          name: {
            [Op.like]: `%${filter}%`,
          },
        },
        {
          email: {
            [Op.like]: `%${filter}%`,
          },
        },
      ],
    },
    order: [["createdAt", "DESC"]], // Sort by the creation date in descending order
    limit,
    offset,
  });

  const totalPages = Math.ceil(users.count / limit); // Total number of pages for pagination

  res.render('admin/admin-template',{   
    viewFile : "users/users.ejs",
    pageTitle : 'Users',
    name : req.session.name,
    adminId : req.session.adminId,
    session : req.session.isLoggedIn, 
    activeMenu: "dashboard" ,
    totalPages:totalPages,
    currentPage: page,
    users: users.rows
  });
}; 

module.exports = {
  getUsers : getUsers
};
*/