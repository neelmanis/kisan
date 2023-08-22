
exports.isAuthenticated = (req, res, next) => {
   //console.log(req.body)
   if(
     req.route.path == '/login' 
   //  ||  req.route.path == '/forgot-password'
   ){
      
     if( req.session.isLoggedIn && req.session.adminId ){
       return res.redirect('/admin/dashboard');
     }else{
       next()
     }
   }else{
     if( !req.session.isLoggedIn ){
       return res.redirect('/admin/login');
     }else{  
       next()
     }
   }
 }

/*const isLogin = async(req, res, next)=> {
   try {
    console.log (req.session.loggedin)
    if(req.session.loggedin){}
     else {
      res.redirect('/admin/login')
     }
     next()
   } catch (error) {
      console.log(error.message)
   }
}

const isLogout = async(req, res, next)=> {
   try {
     //console.log (req.session.loggedin)
     if(req.session.loggedin){
      req.session.destroy();
      res.redirect('/admin/login')
     }
     next()

   } catch (error) {
      console.log(error.message)      
   }
}

module.exports = {
   isLogin,
   isLogout
}; */