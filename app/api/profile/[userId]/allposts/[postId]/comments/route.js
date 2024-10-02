import { connectToDB } from "@utils/database";
import Post from "@models/Post";
import Profile from "@models/Profile";
import User from "@models/User";

export const POST = async (req, { params }) => {
  await connectToDB();
  const { comment, userID } = await req.json();
  try {
    const { postId } = params;
    console.log('The postId is:',postId);
    const isPost = await Post.findById(postId);
    if (!isPost) {
      return new Response(JSON.stringify("Could not find the post"), {
        status: 404,
      });
    }
    const user = await User.findById(userID);
    if (!user) {
      return new Response(JSON.stringify("User not found"), { status: 404 });
    }
    const profile = await Profile.findOne({userId:userID});

    isPost.comments.push({
      profilePicture:profile.profilePicture,
      userName: user.userName,
      text: comment,
    });
    await isPost.save();
    return new Response(JSON.stringify(isPost.comments), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify("Server error", error), { status: 500 });
  }
};
export const GET = async (req, { params }) => {
  await connectToDB();

  try {
    const { postId } = params; 
    const post = await Post.findById(postId)
    if (!post) {
      return new Response(JSON.stringify("Post not found"), { status: 404 });
    }

    return new Response(JSON.stringify(post.comments), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify("Error fetching comments"), { status: 500 });
  }
};
