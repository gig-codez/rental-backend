
import multer, { diskStorage } from "multer";

const ImageStorage = () =>
    diskStorage({
        destination: (req, file, cb) => {
            cb(null, "uploads/images");
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        },
    });

const fileUpload = (destination) =>
    multer({
        storage: ImageStorage(destination),
        limits: {
            fieldSize: 2 * 1024 * 1024, //2mb
        },
        onError: function (err, next) {
            return console.log("error: ", err);
        },
    }).single('image');

export default fileUpload;