const Multer = require("multer");
const mimetypes = ["image/jpg", "image/jpeg", "image/png", "image/gif"];


const generateMulterUpload = (fullPath) => Multer({
    storage: Multer.diskStorage({
        destination: (req, file, cb) => cb(null, fullPath),
        filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
    }),
    fileFilter: (req, file, cb) => {
        if (mimetypes.includes(file.mimetype)) return cb(null, true)
        else cb(null, false)
      
    },
    limits: { filesize: "2000000" }   
});

const uploadEventImage = generateMulterUpload('./public/images/event');
const uploadUserImage = generateMulterUpload('./public/images/user');

module.exports = { uploadEventImage, uploadUserImage };