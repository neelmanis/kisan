const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser')
const Admin = require('./models/admin/adminModel')
const Master = require('./models/admin/masterModel')
const Customer = require('./models/admin/customerModel')
const Useri = require('./models/admin/useri')
const News = require('./models/admin/newsModel')

//const adminRoutes = require('./routes/admin-routes')
const router = require('./routes/router')
const bodyParser = require('body-parser')
const session = require('express-session')

const sequelize = require('./config/database');

const SequelizeStore = require("connect-session-sequelize")(session.Store);
const store = new SequelizeStore({
  db: sequelize
});

// Enable body parser Post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser())
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

// CONFIG BASE URL FOR PATH
global.nodeSiteUrl = 'http://localhost:3000/'; // node

app.use(
    session({
      secret: '@@wedding$$give$$kwebmaker@@',
      resave: false,
      saveUninitialized: false,
      store: store,
      checkExpirationInterval: 15 * 60 * 1000,
      cookie: {
        secure: false,
        httpOnly: false,
        maxAge: 60 * 60 * 1000 * 24
      }
    })
  );

  app.use((req, res, next) => {
    if (!req.session.isLoggedIn && !req.session.adminId) {
      return next();
    }
  
    Admin.findByPk(req.session.adminId)
    .then(admin => {
      req.admin = admin;
  
      res.locals.isLoggedIn = true,
      res.locals.userInfo = {
        name: admin.name,
        image: `/${admin.imagePath}`
      }
      next();
    })
    .catch(err => console.log(err));
  });

// Require static assets from public folder 
app.use(express.static(path.join(__dirname,'public')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// view engine setup
//app.use(expressLayouts)
app.set('view engine', 'ejs');
app.set('views',"views");

//app.use(adminRoutes.routes)
router(app)

const port = process.env.PORT || 3000;
app.listen(port, () => {
 //   console.log(`App is listening on url http://localhost:${port}`)
    console.log(`App is listening on development url ${nodeSiteUrl}`)
})

/**
 *  Configuring Sequelize ORM
 */
 //News.sync({ force: true })

  // .sync({ alter: true })
  // .then(result => {
  //   app.listen(PORT, () => {
  //     console.log(`Database sync & App is running at ${PORT}`);
  //   });
  // })
  // .catch(err => {
  //   console.log(err);
  // });