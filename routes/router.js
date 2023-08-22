const adminRoutes = require('./admin-routes');
const useriRoutes = require('./useri-route');
const newsRoutes  = require('./news-routes')

//const apiRoutes = require('./api.route');

const router = ( app ) => {
  app.use('/admin', adminRoutes);
  app.use('/useri', useriRoutes);
  app.use('/news', newsRoutes);
  
/*
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, AuthToken');
    next();
  });
  */

//  app.use('/api', apiRoutes);

//  app.use(errorController.get404);
}

module.exports = router;