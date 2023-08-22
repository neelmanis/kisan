const cropModel = require("../../models/admin/cropModel");
const datatableModel = require("../../models/admin/datatableModel");
const { check, validationResult } = require('express-validator'); 
const genericModel = require("../../models/genericModel");
const multer = require('multer');
const fs = require('fs');

const getAddCrop = (req, res) => {
    res.set('content-type' , 'text/html; charset=mycharset'); 
    res.render("admin-template",{
        viewFile:"master/crop/add-crop",  
        scriptFile:"master/crop/add-crop",  
        page_title:"Add Crops",  
    });
};

const getUpdateCrop = async(req, res) => {
    res.set('content-type' , 'text/html; charset=mycharset');
    const crop = await genericModel.fetchRecords("crop_master",{id:req.params.id});
    const data = {crop:crop.data} 
    res.render("admin-template",{
        viewFile:"master/crop/edit-crop",  
        scriptFile:"master/crop/edit-crop",  
        page_title:"Update Crop",
        params:data,  
    });
};

const cropList = (req, res) => {
    res.set('content-type' , 'text/html; charset=mycharset'); 
    data = {};
    res.render("admin-template",{
        viewFile:"master/crop/crop-list",  
        scriptFile:"master/crop/crop-list",  
        page_title:"Crop List",  
      //  data:allRecord
    });
};
const getCropList = async(req, res) => {
    res.set('content-type' , 'text/html; charset=mycharset'); 
    let table = "crop_master";
    let draw = req.body.draw;
    let start = req.body.start;
    let length = 10;
    let searchValue = req.body.search.value;
   


    // DEFINE SEARCHABLE columns
    const searchableColumns = ["name"];
    // TOTAL RECORDS
    const totalRecords = await datatableModel.getTotalRecords(table);
     // TOTAL RECORDS AFTER FILTER
    const totalRecordsWithFilter = await datatableModel.getTotalRecordsWithFilter(table,searchableColumns,searchValue);
     // TOTAL ROWS
    const rows = await datatableModel.getData(table,searchableColumns,searchValue,start,length);
    var data = [];
    var temp = [];
    if(rows.length >0 ){
        for (let i = 0; i < rows.length; i++) {
            let action  = `<td class="text-right">
            <div class="dropdown d-inline-block">
                <a class="dropdown-toggle arrow-none" id="dLabel11" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                    <i class="las la-ellipsis-v font-20 text-muted"></i>
                </a>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dLabel11">
                    <a class="dropdown-item" target="_blank" href="${nodeSiteUrl}admin/crop/update-crop/${rows[i].id}">Update </a>
                </div>
            </div>
        </td>`;
        let status = `<span class="badge bg-success">Active</span>`;
        if(rows[i].status == "1"){
             status = `<span class="badge bg-success">Active</span>`;
        }else{
             status =`<span class="badge bg-danger">Inactive</span>`;
        }
        let photo = ``;
        if(rows[i].photo !==""){
            photo = `<img src="/website_images/${rows[i].photo}" alt="${rows[i].name} " class="img-fluid" width="100px">`;
        }else{
            photo = "";
        }
            
            temp.push(Number(start) + Number(i) + Number(1));
            temp.push(rows[i].name);
            temp.push(photo);
            temp.push(status);
            temp.push(rows[i].created_date);
            temp.push(action);

            data.push(temp);
            temp = [];
        }
    }
    return res.status(200).json({
        draw:draw,
        iTotalRecords:totalRecords,
        iTotalDisplayRecords:totalRecordsWithFilter,
        aaData:data
    });
};
const addCropValidation = [
    check('name', 'Enter Crop name')
    .not().isEmpty().trim().escape(),
];
const updateCropValidation = [
    check('name', 'Enter Crop name')
    .not().isEmpty().trim().escape(),
    check('status', 'Please select status')
    .not().isEmpty().trim().escape(),
    
];


const addCropAction = async(req, res)=>{
    
    const errors = validationResult(req);
	if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
	}
    try{
        let photo;
        if(req.files.photo){
             photo = req.files['photo'][0].filename;
        }else{
             photo = "";
        }
        let data = {
            name: req.body.name,
            photo:photo,
            status: "1"
        };
            //create a new user
        await cropModel.createNewCrop(data);
        return res.status(200).json({
            isRedirect:false,
            redirectUrl:"admin/crop/crop-list",
            icon:"success",
            title:"",
            message: "Crop Created successfully"
        });
    }catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
}
const storagePhoto =   multer.diskStorage({  
    destination: function (req, file, callback) {  
       
        var photo_path = './public/website_images';
        if (!fs.existsSync(photo_path)){
            fs.mkdirSync(photo_path);
        }
      callback(null, photo_path);  
    },  
    filename: function (req, file, callback) {  
        let ext  = file.mimetype.split('/')[1];
        let file_name = file.fieldname+"_"+Date.now();
        callback(null, `${file_name}.${ext}`);  
    }  
}); 
  
const uploadPhoto = multer({
    storage: storagePhoto,
    
    fileFilter: (req, file, callback) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            callback(null, true);
        } else {
           // callback(null, false);
           
             callback('केवल .png, .jpg और .jpeg प्रारूप की अनुमति है!',false);
        }
    }
}).fields([{name: "photo"}]);

const updateCropAction = async(req, res)=>{
    
    const errors = validationResult(req);
	if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
	}
    try{
        let id = req.body.id;
        let getPhoto = await genericModel.getName("crop_master","id",id,"photo");
       
        if(req.files.photo){
            var photo = req.files['photo'][0].filename;
        }else{
            var photo = getPhoto.data;
        }
       
        let data = {
            name: req.body.name,
            photo:photo,
            status: req.body.status
        };
        //create a new user
        const update = await genericModel.updateRecords("crop_master",data,"id",id);
        if(update.status){
            return res.status(200).json({
                isRedirect:true,
                redirectUrl:"admin/crop/crop-list",
                icon:"success",
                title:"",
                message: "Crop updated successfully"
            });
        }else{
            return res.status(200).json({
                isRedirect:false,
                redirectUrl:"admin/crop/crop-list",
                icon:"warning",
                title:"Server Error",
                message: "Crop updating failed"
            });
        }
        
    }catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
}


const getListedCrops = (req, res) => {
    res.set('content-type' , 'text/html; charset=mycharset'); 
    data = {};
    res.render("admin-template",{
        viewFile:"crop/crop-list",  
        scriptFile:"crop/crop-list",  
        page_title:"Listed Crop List",  
    });
};

const getListedCropsRecords = async(req, res) => {
    try {
        let table = "crops_for_sale";
        let draw = req.body.draw;
        let start = req.body.start;
        let length = 10;
        let searchValue = req.body.search.value;
        // DEFINE SEARCHABLE columns
        const searchableColumns = ["crop_name","info"];
        // TOTAL RECORDS
        const totalRecords = await datatableModel.getTotalRecords(table);
        
         // TOTAL RECORDS AFTER FILTER
        const totalRecordsWithFilter = await datatableModel.getTotalRecordsWithFilter(table,searchableColumns,searchValue);
         // TOTAL ROWS
        const rows = await datatableModel.getData(table,searchableColumns,searchValue,start,length);
        
        var data = [];
        var temp = [];
       
        if(rows.length >0 ){
            for (let i = 0; i < rows.length; i++) {
              
                let action  = `<td class="text-right">
                <div class="dropdown d-inline-block">
                    <a class="dropdown-toggle arrow-none" id="dLabel11" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                        <i class="las la-ellipsis-v font-20 text-muted"></i>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dLabel11">
                        <a class="dropdown-item" target="_blank" href="${nodeSiteUrl}admin/crop/crop-requests/${rows[i].id}">View Requests </a>
                       
                    </div>
                </div>
            </td>`;
      
            let image =  `<img src="${nodeSiteUrl}uploads/${rows[i].registration_id}/crops/${rows[i].photo1}" class="img-fluid"/>`;
           
           
            let uploaded_By =  await genericModel.getName("user_registration","id",rows[i].registration_id,"fullName");
           
           
                temp.push(Number(start) + Number(i) + Number(1));
                temp.push(image);
                temp.push(rows[i].crop_name);
                temp.push(rows[i].crop_variety_name);
                temp.push(rows[i].price);
                temp.push(rows[i].status );
                temp.push(uploaded_By.data);
                temp.push(rows[i].created_date);
                temp.push(action);
    
                data.push(temp);
                temp = [];
            }
        }
      
        return res.status(200).json({
            draw:draw,
            iTotalRecords:totalRecords,
            iTotalDisplayRecords:totalRecordsWithFilter,
            aaData:data
        });
    } catch (error) {
        console.log(error);
    }
   
};


const getCropRequests = (req, res) => {
    res.set('content-type' , 'text/html; charset=mycharset'); 
    data = {};
    res.render("admin-template",{
        viewFile:"crop/crop-requests",  
        scriptFile:"crop/crop-requests",  
        page_title:"Crop Request List",  
        //data:allRecord
    });
};

const getListedCropRequestRecords = async(req, res) => {

    res.set('content-type' , 'text/html; charset=mycharset'); 
    let table = "crop_enquiries";
    let draw = req.body.draw;
    let start = req.body.start;
    let length = 10;
    let searchValue = req.body.search.value;


    // DEFINE SEARCHABLE columns
    const searchableColumns = ["name"];
    // TOTAL RECORDS
    const totalRecords = await datatableModel.getTotalRecordsById(table,"crop_id",req.params.id);
   // const totalRecords = await datatableModel.getTotalRecordsById(table,"anima);
     // TOTAL RECORDS AFTER FILTER
    const totalRecordsWithFilter = await datatableModel.getTotalRecordsWithFilterById(table,"crop_id",req.params.id,searchableColumns,searchValue);
     // TOTAL ROWS
    const rows = await datatableModel.getDataById(table,"crop_id",req.params.id,searchableColumns,searchValue,start,length);
    var data = [];
    var temp = [];
    if(rows.length >0 ){
        for (let i = 0; i < rows.length; i++) {
        let uploaded_By =  await genericModel.getName("user_registration","id",rows[i].registration_id,"fullName");
            temp.push(Number(start) + Number(i) + Number(1));
            temp.push(uploaded_By.data);
            temp.push(rows[i].created_date);
            data.push(temp);
            temp = [];
        }
    }
    return res.status(200).json({
        draw:draw,
        iTotalRecords:totalRecords,
        iTotalDisplayRecords:totalRecordsWithFilter,
        aaData:data
    });
};

module.exports = {
    getAddCrop: getAddCrop,
    cropList: cropList,
    updateCropAction:updateCropAction,
    getUpdateCrop:getUpdateCrop,
    uploadPhoto:uploadPhoto,
    getCropList: getCropList,
    addCropAction:addCropAction,
    addCropValidation:addCropValidation,
    updateCropValidation:updateCropValidation,
    getListedCrops:getListedCrops,
    getListedCropsRecords:getListedCropsRecords,
    getCropRequests:getCropRequests,
    getListedCropRequestRecords:getListedCropRequestRecords

  

};

