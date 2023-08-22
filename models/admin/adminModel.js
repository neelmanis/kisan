/* const connection  = require("../../config/database");
const bcrypt = require('bcrypt');

const createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {  
                connection.query("INSERT INTO  admin_master set ? ", data, function(error, rows) {
                if (error) reject(error);
                resolve("create a new user successfully");
                });
           
        } catch (e) {
            reject(e);
        }
    });
};

let getUserList =async ()=>{
   
    try {   
        let sql='select * from admin_master  ORDER BY id DESC';    
        try {
            return new Promise((resolve, reject) => {
                connection.query(sql, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        } catch (e) {
            return e;
        }
     
}finally {
 
} 
};

let getUserDetails =async (userId)=>{
   
    try {   
        let sql=`select * from admin_master WHERE id = '${userId}' `;    
        try {
            return new Promise((resolve, reject) => {
                connection.query(sql, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        } catch (e) {
            return e;
        }
     
}finally {
 
} 
};


const updateUser = (data,updateId) => {
    return new Promise(async(resolve, reject) => {
        try {                
               const param = [data,updateId]    
                    connection.query("UPDATE  admin_master set ? WHERE adminId = ?", param, function(error, rows) {
                    //console.log(error);
                    if (error){
                        reject(error); 
                    }else{
                        resolve(true);
                    }                    
                });
        
        } catch (e) {
            reject(e);
        }
    });
};


const checkEmailUser = (email) => {
    return new Promise((resolve, reject) => {
        try{
            connection.query("SELECT * from  admin_master where email = ?", email, function(error, rows) {
             //   console.log(error);
                if(error) reject(error);
                if(rows.length > 0) resolve(true);
                resolve(false);
            })
        }catch (e) {
            reject(e);
        }
    }) ;
};

const findUserByEmail = (email)=>{
    return new Promise((resolve, reject) => {
        try{
            connection.query("SELECT * from admin_master where email = ?", email, function(error, rows) {
               if(error) reject(error);
               const user = rows[0];
               resolve(user);
            });
        }catch (e) {
            reject(e);
        }
    })
};


   
   const compareUserPassword =  (userInputPassword, password)=>{
       return new Promise(async (resolve, reject) => {
           try{
               const match = await bcrypt.compare(userInputPassword, password);
               if(match) resolve(true);
               else resolve("The password that you've entered is incorrect")
           }catch (e) {
               reject(e);
           }
       })
   };

module.exports = {
    createNewUser: createNewUser,
    getUserList:getUserList,
    getUserDetails:getUserDetails,
    updateUser:updateUser,
    checkEmailUser : checkEmailUser,
    findUserByEmail : findUserByEmail,
    compareUserPassword : compareUserPassword

};

*/

const Sequelize = require('sequelize');

const sequelize = require('../../config/database');

const Admins = sequelize.define('admin_master', {
  adminId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  imageFileName: Sequelize.STRING,
  imageName: Sequelize.STRING,
  imagePath: Sequelize.STRING,
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  passwordText: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  passwordEncrypted: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  permission: Sequelize.STRING,
  role: {
    type: Sequelize.ENUM,
    allowNull: false,
    values: ['superadmin', 'admin']
  },
  token: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM,
    allowNull: false,
    values: ['active', 'deactive']
  }
});

module.exports = Admins;
