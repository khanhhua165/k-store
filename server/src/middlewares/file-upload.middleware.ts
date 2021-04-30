import multer from "multer";
import { v4 as uuid } from "uuid";

interface IMime {
  [mime_type: string]: string;
}
const MIME_TYPE_MAP: IMime = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const fileUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/images");
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, uuid() + "." + ext);
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    if (isValid) {
      cb(null, isValid);
    } else {
      cb(new Error("Invalid mime type"));
    }
  },
});

export default fileUpload;
