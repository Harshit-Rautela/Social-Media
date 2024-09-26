import { connectToDB } from "@utils/database";
import Post from "@models/Post";
import Profile from "@models/Profile";

export const POST = async (req, { params }) => {
  console.log('Inside the likes section')
  await connectToDB();
  const { userID } = await req.json();
  try {
    const { postId } = params;
    const post = await Post.findById(postId);
    if (!post) {
      return new Response(JSON.stringify("Could not find the post"), {
        status: 404,
      });
    }
    if (post.likedBy.includes(userID)) {
      return new Response(JSON.stringify("User has alrerady like the post"), {
        status: 400,
      });
    }
    post.likedBy.push(userID);
    post.likes += 1;
    await post.save();
    return new Response(
      JSON.stringify({ message: "Post liked successfully", post }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(JSON.stringify("Server error, cannot like the post"), {
      status: 500,
    });
  }
};

export const DELETE = async (req, { params }) => {
  await connectToDB();
  console.log('Inside the likes section')
  const { userID } = await req.json();
  try {
    const { postId } = params;
    const post = await Post.findById(postId);
    if (!post) {
      return new Response(JSON.stringify("Could not find the post"), {
        status: 404,
      });
    }
    if (post.likedBy.includes(userID)) {
      post.likedBy = post.likedBy.filter((id)=>id.toString() !==userID);
      post.likes -= 1;
      await post.save();
      return new Response(
        JSON.stringify({ message: "Post unliked successfully", post }),
        {
          status: 200,
        }
      );
    }
  } catch (error) {
    return new Response(JSON.stringify("Server error, cannot like the post"), {
      status: 500,
    });
  }
};
