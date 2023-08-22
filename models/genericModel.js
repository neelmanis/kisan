const connection  = require("../config/database");

let fetchRecords =  (table,params,order,ordercolumn)=>{
    return new Promise(async (resolve, reject) => {
        try{
           let sql = `select * from ${table} where  1 `;
           let output = [];
           for (const [key, value] of Object.entries(params)) {
            sql +=` AND  ${key} = ?`;
            output.push(value);
          }
           var query =  connection.query(sql,output, function(error, rows) {
                if(error) reject(error);
                if(rows.length > 0){
                    resolve({status:true,data:rows});
                }else{
                    resolve({status:false,data:""});
                } 
               
            });
        //    console.log(query.sql);
           
        }catch (e) {
            reject({status:false,data:"NA"});
        }
    })
};
let insertRecords =  (table,data)=>{
    return new Promise(async (resolve, reject) => {
        try{
          let query =  connection.query("INSERT INTO "+table+"  set ? ", data, function(error, result) {
           
                if (error){
                    resolve({status:false});
                }else{
                    resolve({status:true});
                }
                console.log(query.sql)
            });
          
        }catch (e) {
            reject({status:false});
        }
    })
};
let updateRecords =  (table,data,column,value)=>{
    return new Promise(async (resolve, reject) => {
        try{
          let param = [data,value]; 
          let query =  connection.query(`UPDATE ${table}  set ?  WHERE ${column} = ? `, param, function(error, result) {
           
                if (error){
                    resolve({status:false});
                }else{
                    resolve({status:true});
                }
            });
          
        }catch (e) {
            reject({status:false});
        }
    })
};
let getName =  (table,fetch_id,fetch_value,field)=>{
    return new Promise(async (resolve, reject) => {
       // console.log(`SELECT ${field} FROM ${table} WHERE '${fetch_id}' = ?`);
        try{
          let query =  connection.query(`SELECT ${field} FROM ${table} WHERE ${fetch_id} = ?` , fetch_value , function(error, rows) {
                if (error){
                    reject({status:false});
                }else{
                    if(rows.length>0){
                        let name = rows[0][`${field}`];
                        resolve({status:true,data:name});
                    }else{
                        let name = "";
                        resolve({status:true,data:name});
                    }
                }
            });
           // console.log(query.sql);
        }catch (e) {
            reject({status:false});
        }
    })
};
let deleteRecord =  (table,delete_id,delete_value)=>{
    return new Promise(async (resolve, reject) => {
       // console.log(`SELECT ${field} FROM ${table} WHERE '${fetch_id}' = ?`);
        try{
          let query =  connection.query(`DELETE  FROM ${table} WHERE ${delete_id} = ?` , delete_value , function(error, result) {
                if (error){
                    reject({status:false});
                }else{
                    resolve({status:true});
                }
            });
         
        }catch (e) {
            reject({status:false});
        }
    })
};

let getCount =  (table,params)=>{
    return new Promise(async (resolve, reject) => {
        try{
           let sql = `select count(*) as total_count from ${table} where  1 `;
           let output = [];
           for (const [key, value] of Object.entries(params)) {
            sql +=` AND  ${key} = ?`;
            output.push(value);
          }
           var query =  connection.query(sql,output, function(error, rows) {
                if(error) {
                    reject(error)
                }else{
                    resolve({data: rows[0].total_count});
                };
               
                //console.log(query.sql);
                
            });
            
        }catch (e) {
            reject({status:false,data:"NA"});
        }
    })
};


let customQuery =  (sql)=>{
    return new Promise(async (resolve, reject) => {
        try{
          
           var query =  connection.query(sql,function(error, rows) {
                if(error) reject(error);
                if(rows.length > 0) resolve({status:true,data:rows});
                resolve({status:false,data:""});
                //console.log(query.sql);
            });
           
        }catch (e) {
            reject({status:false,data:"NA"});
        }
    })
};

module.exports = {

    fetchRecords:fetchRecords,
    insertRecords:insertRecords,
    getName:getName,
    deleteRecord:deleteRecord,
    getCount:getCount,
    updateRecords:updateRecords,
    customQuery:customQuery

    
};