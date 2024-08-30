import { v2 as cloudinary } from "cloudinary";
import nextConnect from "next-connect";
import multer from "multer";
import path from "path";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/uploads");
    },
    filename: function (req, file, cb) {
      cb(null, file.name);
    },
  }),
});
//this nextConnect will help to apply multer middleware
const handler = nextConnect();
handler.use(upload.single('image'));
handler.post(async (req, res) => {
  console.log("handler");
  try {
    const filePath = path.join("./public/uploads", req.file.filename);
    console.log("The filepath is:", filePath);

    // Upload image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      folder: "profiles",
    });

    // Remove the file from the temporary directory after uploading
    // fs.unlinkSync(filePath);

    res.status(200).json({ url: uploadResult.secure_url });
  } catch (error) {
    res.status(500).json({ error: "Error uploading image" });
  }
});

export default handler;
