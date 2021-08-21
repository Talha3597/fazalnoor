
// const multer= require('multer')
// const path =require('path')
// const { count } = require('../../model/noticeboardSchema')
// const storage=multer.diskStorage({destination: function (req, file, cb) {
//     cb(null, './public/uploads')
//   },
// filename:function(req,file,cb){
//     cb(null,"photo"+'-'+Date.now()+path.extname(file.originalname))
// }

// })
// module.exports.upload =multer({storage:storage,
// limits:{fileSize:1000000},
// fileFilter:function(req,file,cb){
//     checkFileType(file,cb)
// }
// }).single('photo')
// function checkFileType(file,cb){
//     //allowed type
//     const filetypes=/jpeg|jpg|png|gif/
//     //
//     const extname=filetypes.test(path.extname(file.originalname).toLowerCase())
//     // mine type
//     const minetype=filetype.test(file.minetype)

//     if(minetype&& extname)
//     {
//         return cb(null,true)
//     }
//     else{
//        return cb('Error:Images only!')
//     }
// }

// module.exports.Upload= function(req,res,err)
// {
     
           
//         console.log("Request ---", req.body);
//         console.log("Request file ---", req.file);//Here you get file.
//         /*Now do where ever you want to do*/
//        if(!err)
//            return res.status(200).end();
        
    
// }
