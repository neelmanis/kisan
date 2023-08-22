
const connection  = require("../../config/database");

let getTotalRecords =async (table)=>{
   
    try {   
        let sql=`select count(*) as allcount from ${table}`;    
        try {
            return new Promise((resolve, reject) => {
                connection.query(sql, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result[0].allcount);
                    }
                });
            });
        } catch (e) {
            return e;
        }
     
}finally {
 
} 
};
let getTotalRecordsWithFilter =async (table,searchableColumns,searchValue)=>{
   
    try {   
       
        let searchQuery = "";
        if( searchableColumns.length > 0){
            if(searchValue !=="" ){
                searchQuery += "and (";
                for (var i = 0; i < searchableColumns.length; i++) {
                // console.log(searchableColumns[i]);
                    searchQuery += `${searchableColumns[i]} like '%${searchValue}%' or `;

                    if(searchableColumns.length -1 == i){
                        searchQuery += `${searchableColumns[i]} like '%${searchValue}%' `;
                    }
                }
                searchQuery += " )";
            }
        }
        

        let sql=`select count(*) as allcount from ${table} where 1 ${searchQuery}`;    
     
        try {
            return new Promise((resolve, reject) => {
               let query =  connection.query(sql, (err, result) => {
               
                    if (err) {
                        reject(err);
                    } else {

                        resolve(result[0].allcount);
                    }
                });
            });
        } catch (e) {
            return e;
        }
     
}finally {
 
} 
};

let getData =async (table,searchableColumns,searchValue,start,length)=>{
    try {   

        let searchQuery = "";
        if( searchableColumns.length > 0){
            if(searchValue !=""){
                searchQuery += "and (";
                for (var i = 0; i < searchableColumns.length; i++) {
                // console.log(searchableColumns[i]);
                    searchQuery += `${searchableColumns[i]} like '%${searchValue}%' or `;

                    if(searchableColumns.length -1 == i){
                        searchQuery += `${searchableColumns[i]} like '%${searchValue}%' `;
                    }
                }
                searchQuery += " )";
            }
        }

        let sql=`select *  from ${table} where 1 ${searchQuery} limit ${start}, ${length}` ;    
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





let getTotalRecordsById =async (table,columnName,columnValue)=>{
   
    try {   
        let sql=`select count(*) as allcount from ${table} WHERE ${columnName} ='${columnValue}' `;    
        try {
            return new Promise((resolve, reject) => {
                connection.query(sql, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result[0].allcount);
                    }
                });
            });
        } catch (e) {
            return e;
        }
     
}finally {
 
} 
};
let getTotalRecordsWithFilterById =async (table,columnName,columnValue,searchableColumns,searchValue)=>{
   
    try {   
        let searchQuery = "";
        if(searchValue !=""){
            searchQuery += "and (";
            for (var i = 0; i < searchableColumns.length; i++) {
               // console.log(searchableColumns[i]);
                searchQuery += `${searchableColumns[i]} like '%${searchValue}%' or `;

                if(searchableColumns.length -1 == i){
                    searchQuery += `${searchableColumns[i]} like '%${searchValue}%' `;
                }
            }
            searchQuery += " )";
        }
        

        let sql=`select count(*) as allcount from ${table} where 1 AND  ${columnName} ='${columnValue}' ${searchQuery}`;    
       
        try {
            return new Promise((resolve, reject) => {
                connection.query(sql, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {

                        resolve(result[0].allcount);
                    }
                });
            });
        } catch (e) {
            return e;
        }
     
}finally {
 
} 
};

let getDataById =async (table,columnName,columnValue,searchableColumns,searchValue,start,length)=>{
    try {   

        let searchQuery = "";
        if(searchValue !=""){
            searchQuery += "and (";
            for (var i = 0; i < searchableColumns.length; i++) {
               // console.log(searchableColumns[i]);
                searchQuery += `${searchableColumns[i]} like '%${searchValue}%' or `;

                if(searchableColumns.length -1 == i){
                    searchQuery += `${searchableColumns[i]} like '%${searchValue}%' `;
                }
            }
            searchQuery += " )";
        }

        let sql=`select *  from ${table} where 1 AND ${columnName} ='${columnValue}'  ${searchQuery} limit ${start}, ${length}` ;    
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


module.exports = {
    getTotalRecords:getTotalRecords,
    getTotalRecordsWithFilter:getTotalRecordsWithFilter,
    getData:getData,
    getTotalRecordsById:getTotalRecordsById,
    getTotalRecordsWithFilterById:getTotalRecordsWithFilterById,
    getDataById:getDataById,
};