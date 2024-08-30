import { connectToDB } from "@utils/database";
import Profile from "@models/Profile";
import { v2 as cloudinary } from "cloudinary";
import sharp from "sharp";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  timeout: 60000,
});

// Function to upload image to Cloudinary
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { resource_type: "auto" }, // auto-detect the file type
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    ).end(buffer); // End the stream with the image buffer
  });
};

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const { userId } = params;

    const profile = await Profile.findOne({ userId });
    if (!profile) {
      return new Response(JSON.stringify("Profile is not present"), {
        status: 404,
      });
    }
    return new Response(JSON.stringify(profile), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error fetching profile" }), {
      status: 500,
    });
  }
};

export const PUT = async (req, { params }) => {
  try {
    await connectToDB();
    const { userId } = params;
    const profile = await Profile.findOne({ userId });

    if (!profile) {
      return new Response(JSON.stringify({ message: "Profile not found" }), {
        status: 404,
      });
    }

    const formData = await req.formData(); // Using native FormData API
    const bio = formData.get("bio");
    const image = formData.get("image");
    
    profile.bio = bio;
    
    if (image) {
      console.log("Inside the image/formdata section");
      const buffer = Buffer.from(await image.arrayBuffer());

      // Process image with Sharp
      const optimizedBuffer = await sharp(buffer)
        .resize({ width: 800 }) // Resize to a maximum width of 800px
        .jpeg({ quality: 80 }) // Convert to JPEG with 80% quality
        .toBuffer();

      // Upload image to Cloudinary and wait for completion
      const uploadResult = await uploadToCloudinary(optimizedBuffer);
      
      // Set profile picture URL
      profile.profilePicture = uploadResult.secure_url;
    }
    
    console.log("Updated profile object before saving:", profile);
    await profile.save();
    console.log("Profile saved successfully!");

    return new Response(
      JSON.stringify({ message: "Profile updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating profile:", error);
    return new Response(JSON.stringify({ message: "Error updating profile" }), {
      status: 500,
    });
  }
};
