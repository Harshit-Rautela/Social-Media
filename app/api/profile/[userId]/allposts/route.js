import { connectToDB } from "@utils/database";
import Post from "@models/Post";
import Profile from "@models/Profile";

export const GET = async (req, { params }) => {
  await connectToDB();
  try {
    const { userId } = params;
    const isUser = await Profile.findOne({ userId });
    if (!isUser) {
      return new Response(
        JSON.stringify("Could not find the profile"), {
          status: 404,
        }
      );
    }
    const posts = await Post.find({authorId:userId});
    if(!posts||posts.length===0){
        return new Response(
            JSON.stringify("Could not fetch the posts"), {
              status: 404,
            }
          );
    }
    return new Response(
        JSON.stringify(posts), {
          status: 200,
        }
      );
  } catch (error) {
    return new Response(
        JSON.stringify({ message: "Error fetching posts" }), {
          status: 500,
        }
      );
  }
};
