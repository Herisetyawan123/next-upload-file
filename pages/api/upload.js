import nc from "next-connect"
import multer from "multer"
import path from "path"
import { v4 as uuidv4 } from 'uuid';


export const config = {
    api: {
        bodyParser: false
    }
}


const fn = ""
const upload = multer({
    storage: multer.diskStorage({
        destination: function(req, file, cb){
            cb(null, path.join(process.cwd(), "public", "uploads"))
        },
        filename: function(req, file, cb){
            cb(null, uuidv4() + "-" + file.originalname)
        },
    }),
})

const handler = nc({
    onError: (err, req, res, next) => {
      console.error(err.stack);
      res.status(500).end("Something broke!");
    },
    onNoMatch: (req, res) => {
      res.status(404).end("Page is not found");
    },
}).use(upload.single("image")).post((req, res) => {
    res.status(200).json({ message: "berhasil", file: req.file})
})

export default handler