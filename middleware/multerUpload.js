////Multer///
const multer = require('multer');
const uploads_folder = './public/uploads';
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploads_folder);
    },
    filename: (req, file, cb) => {
        //Important File.pdf => important-file3456.pdf
        const fileExt = path.extname(file.originalname); // extract the extension
        const fileName = file.originalname.replace(fileExt, "") + fileExt;
        cb(null, fileName);
    }
})
var upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000 // in bytes, 1MB= 1000 KByte * 1000 Byte
    },
    fileFilter: (req, file, cb) => {
        //console.log(file);
        if (file.fieldname === "sampleFile" ) {
          if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
              cb(null, true);
          } else {
              cb(new Error("Only .jpg, .jpeg or .png file are allowed!"));
          }

      } else if (file.fieldname === "doc") {
         if(file.mimetype === "application/pdf"){
             cb(null, true);
         } else {
             cb(new Error("Only .pdf file are allowed"));
         }
      }else{
          cb(new Error("There was an unknown error"));
      }

  }
})

exports.upload=multer({storage:storage, upload: upload});