const connection  = require("../../config/database");
const bcrypt = require('bcrypt');

const handleLogin = (email_id, password) => {
    return new Promise(async (resolve, reject) => {
        //check email is exist or not
        const user = await findUserByEmail(email_id);
        //console.log(user)
        if (user) {
            //compare password
            await bcrypt.compare(password, user.password).then((isMatch) => {
                //console.log(isMatch)
                if (isMatch) {
                    resolve(true);
                } else {
                    reject(`The password that you've entered is incorrect`);
                }
            });
        } else {
            reject(`This user email "${email}" doesn't exist`);
        }
    });
};

const findUserByEmail = (email)=>{
    return new Promise((resolve, reject) => {
        try{
            connection.query("SELECT * from admin_master where email_id = ?", email, function(error, rows) {
               if(error) reject(error);
               let user = rows[0];
               resolve(user);
            });
        }catch (e) {
            reject(e);
        }
    })
   };
   
   const compareUserPassword =  (user, pass)=>{
       return new Promise(async (resolve, reject) => {
           try{
            const match = await bcrypt.compare(pass, user.pass);
            
               if(match) resolve(true);
               else resolve("The password that you've entered is incorrect!!")
           }catch (e) {
               reject(e);
           }
       })
   };
   
   const findUserById = (id) => {
       return new Promise((resolve, reject) => {
           try{
               connection.query("SELECT * from admin_master where id = ?", id, function(error, rows) {
                   if(error) reject(error);
                   let user = rows[0];
                   resolve(user);
               });
           }catch (e) {
               reject(e);
           }
       })
   };
   
   module.exports = {
    handleLogin: handleLogin,   
       compareUserPassword: compareUserPassword,
       findUserByEmail: findUserByEmail,
       findUserById: findUserById
   };