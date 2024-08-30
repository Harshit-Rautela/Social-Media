import { connectToDB } from "@utils/database";
import Post from "@models/Post";
import { v2 as cloudinary } from "cloudinary";
import Profile from "@models/Profile";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
    console.log(profile);
    console.log(profile._id);
    const formData = await req.formData();
    const title = formData.get("title");
    const content = formData.get("content");
    const imageUrl = formData.get("imageUrl");
    const tags = formData.get("tags");
    const location = formData.get(" location");
    const privacy = formData.get("privacy");
    const newPost = new Post({
      title,
      content,
      imageUrl,
      tags,
      location,
      privacy,
      authorId: profile._id,
    });
    console.log("The post is: ", newPost);
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
