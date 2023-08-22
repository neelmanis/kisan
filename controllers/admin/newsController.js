	const News = require('../../models/admin/newsModel')
const { Sequelize,Op } = require('sequelize');
const { body,check,validationResult } = require('express-validator');

const getNewsPage = (req, res, next) => {
  res.render('admin/admin-template',{
   viewFile: "news/list.ejs",
 //  scriptFile: "news",
   pageTitle: "News",
   activeMenu: "news",
   name: req.session.name,
   adminId: req.session.adminId,
   email: req.session.email,
   username: req.session.username
});
};

const getNews = async (req, res) => {
//  console.log(req.query)
 // console.log(req.query.columns)
  try {
 
  const { draw, start, length, search, order, columns } = req.query;
  const { status } = req.query; // Retrieve the status filter value 
  
  // Enable logging to print the generated SQL query
  const logger = (query) => {
    console.log(query);
  };

  // Construct the filter
  const filter = search && search.value ? { title: { [Sequelize.Op.like]: `%${search.value}%` } } : {};
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
  const { count, rows } = await News.findAndCountAll({
    where: filter,
    order: [[sortColumn, sortOrder]],
    offset: page * pageSize,
    limit: 10,
  //  logging: logger,
  });
  //console.log(options)
  
  // Map the data to the DataTables format with column definitions
  const data = rows.map(user => {
    let newsId, title, image, status;

    if (user.newsId) {
        newsId = user.newsId;
    }
  
    if (user.title) {
        title = user.title;
    }
  
    if (user.image) {
        getImage = user.image;
        image = `<img src="./uploads/news/${user.image}" class="img-fluid" width="100px">`;
    }

    if (user.status) {
      if(user.status == "1"){
       status = `<a class="badge bg-success" href="/news/active_action/${user.newsId}" onclick="return(window.confirm(\'Are you sure you want to DeActive?\'));">ACTIVE</a>`; 
    }else{
      status = `<a class="badge bg-danger" href="/news/inActive_action/${user.newsId}" onclick="return(window.confirm(\'Are you sure you want to Active?\'));">DEACTIVE</a>`;
    }
    }
    
    actions = `<a href="/news/view/${user.newsId}" class="btn btn-primary">View</a> | <a href="../update-user/${user.newsId}" class="btn btn-info">Edit</a>`;
    return { newsId, title, image, status, actions};

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
const getNewsDetails = async (req, res) => {
  const newsId = req.params.id; // Get the news ID from the route parameter

  try {
    const news = await News.findByPk(newsId);
   // console.log('Original Model:', news.toJSON());  // print query
    if (!news) {
      return res.status(404).json({ error: 'News not found' });
    }
    res.render('admin/admin-template',{
      viewFile: "news/newsDetail.ejs",
      pageTitle : 'News',
      news,
      name : req.session.name,
      adminId : req.session.adminId,
      session : req.session.isLoggedIn, 
      activeMenu: "news",
    });
  } catch (error) {
    //console.log("Error: ", error)
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
        redirectUrl:"admin/useri",
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
  const newsId = req.params.id; // Get the user ID from the route parameter
 
  try {
    const news = await News.findByPk(newsId);  
    if (!news) {
      return res.status(404).json({ error: 'News not found' });
    }
 
    try {
      news.status = '0';
      const saveNews =  await news.save();
      res.redirect(`${nodeSiteUrl}news`);
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
  const newsId = req.params.id; // Get the user ID from the route parameter
 
  try {
    const news = await News.findByPk(newsId);  
    if (!news) {
      return res.status(404).json({ error: 'News not found' });
    }
 
    try {
      news.status = '1';
      const saveNews =  await news.save();
      res.redirect(`${nodeSiteUrl}news`);
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
  viewFile: "news/create-news.ejs",
  scriptFile: "news",
  pageTitle: "News",
  name : req.session.name,
  adminId : req.session.adminId,
  session : req.session.isLoggedIn, 
  activeMenu: "news",
});
};

const updateNEWSValidation = [
  body("title")
    .notEmpty()
    .withMessage("title is required")
    .trim()
    .escape(),
    body("shortDesc")
    .notEmpty()
    .withMessage("Description is required")
    .trim()
    .escape(),
    body("content")
    .notEmpty()
    .withMessage("content is required")
    .trim()
    .escape(),
  body("slug")
    .notEmpty()
    .withMessage("slug is required")
    .trim()
    .escape()
    .custom((value, { req }) => {
      return new Promise((resolve, reject) => {
        const { slug } = req.body

        News.findOne({ 
          where: { slug: value }
        })
        .then(news => {
          if( !news ){
            return resolve(true)
          }else if ( news && (news.newsId == +newsId) ) {
            return resolve(true)
          }
  
            return reject(new Error('slug already in use'));
          })
          .catch(err => reject(new Error('slug invalid')));
        
      })
    })
];

// create the news details
const createNewsAction = async (req, res) => {

try {

const { title, slug, shortDesc, content } = req.body;
const photo = req.files.photo
//const {originalname, filename, path} = photo[0]

const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(422).json({ errors: errors.array() });
}

if (!photo) {
  return res.status(422).json({ errors : [{ path: "photo", msg : "image required" }]});
}

if(req.fileError){
  extractedErrors.push({photo: req.fileError})
}else if(photo){
  if( photo && photo[0].size > 1048576 ){
    extractedErrors.push({photo: "you have exceeds the maximum upload limit of 1mb"})
  }
}else{
   // extractedErrors.push({photo: "image required"})
   return res.status(422).json({ errors : [{ photo: "image required" }]});
}

  const titleToSlug = title => {
    let slug;   
    slug = title.toLowerCase();

    // remove special characters
    slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
    // The /gi modifier is used to do a case insensitive search of all occurrences of a regular expression in a string

    // replace spaces with dash symbols
    slug = slug.replace(/ /gi, "-");
    
    // remove consecutive dash symbols 
    slug = slug.replace(/\-\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-/gi, '-');
    slug = slug.replace(/\-\-/gi, '-');

    // remove the unwanted dash symbols at the beginning and the end of the slug
    slug = '@' + slug + '@';
    slug = slug.replace(/\@\-|\-\@|\@/gi, '');
    return slug;
  };

const gettitle = req.body.title;
const getslug = titleToSlug(gettitle);

let logoFileName, logoName, logoPath = '';
  if( photo && photo.length > 0 ){
    let {originalname, filename, path} = photo[0]
    path = path.replace(/\\/g, '/')

    logoFileName = originalname;
    logoName = filename;
    logoPath = path;
  }
  
  try {
    // Check if the updated email already exists
    const existingUser = await News.findOne({ where: { slug } });
    if (existingUser && existingUser.slug !== News.slug) {
      return res.status(401).json({       
        title: "Failure",
        icon: "error",
        message: "Slug already exists"
      })  
    }

    try {
      const data = {
        title: req.body.title,
        slug : getslug,
        image : logoName,
        shortDesc : req.body.shortDesc,
        content : req.body.content,
        userId : req.session.adminId,
        status: '1',
        createdAt :  new Date()
    };
      
    const successMsg = await News.create(data);
      return res.status(200).json({
        isRedirect:true,
        redirectUrl:"news",
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
    res.status(500).json({ error: 'Internal server error.' });
  }

} catch (error) {
  res.status(500).json({ error: 'Internal server error..' });
}

}

module.exports = {
  getNewsPage : getNewsPage,
  getNews : getNews,
  getNewsDetails : getNewsDetails,
  updateUserDetails : updateUserDetails,
  updateUserDetailsAction : updateUserDetailsAction,
  active_action : active_action,
  inActive_action : inActive_action,
  addFormPage : addFormPage,
  updateNEWSValidation : updateNEWSValidation,
  createNewsAction : createNewsAction
}