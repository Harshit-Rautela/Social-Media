import { connectToDB } from "@utils/database";
import Post from "@models/Post";
import { v2 as cloudinary } from "cloudinary";
import Profile from "@models/Profile";
import sharp from "sharp";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ resource_type: "auto" }, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      })
      .end(buffer);
  });
};
export const POST = async (req, { params }) => {
  await connectToDB();
  //this userId is actually the default _id of User which is ofcourse stored as userId for Profile.
  const { userId } = params;
  try {
    const profile = await Profile.findOne({ userId });
    if (!profile) {
      return new Response(JSON.stringify({ message: "User is not found" }), {
        status: 404,
      });
    }
    const formData = await req.formData();
    const title = formData.get("title");
    const content = formData.get("content");
    const imageUrl = formData.get("image");
    const tags = formData.get("tags");
    const location = formData.get(" location");
    const privacy = formData.get("privacy");
    let image = "";
    if (imageUrl) {
      const buffer = Buffer.from(await imageUrl.arrayBuffer());
      const optimisedBuffer = await sharp(buffer)
        .resize({ width: 800 }) // Resize to a maximum width of 800px
        .jpeg({ quality: 90 }) // Convert to JPEG with 80% quality
        .toBuffer();
        const response = await uploadToCloudinary(optimisedBuffer);
        image = response.secure_url;
    }
    const newPost = new Post({
      title,
      content,
      imageUrl:image,
      tags,
      location,
      privacy,
      authorId: profile.userId,
    });
    await newPost.save();
    return new Response(JSON.stringify("Post created successfully"), {
      status: 201,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return new Response(JSON.stringify({ message: "Error updating profile" }), {
      status: 500,
    });
  }
};
