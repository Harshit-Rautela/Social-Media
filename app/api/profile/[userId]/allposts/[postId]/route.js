import { connectToDB } from "@utils/database";
import Post from "@models/Post";
import Profile from "@models/Profile";

export const GET  = async(req,{params})=>{
    await connectToDB();
    const {postId} = params;
    try {
        const post = await Post.findById(postId);
        if(!post){
            return new Response(JSON.stringify('Post could not be found'),{
                status:404
            });
        }
        return new Response(JSON.stringify(post),{
            status:200
        })
    } catch (error) {
        return new Response(JSON.stringify('Server error'),{
            status:500
        })
    }
}

export const DELETE = async (req, { params }) => {
    await connectToDB();
    const { postId } = params;
  
    try {
      const post = await Post.findById(postId);
      if (!post) {
        return new Response(JSON.stringify('Post could not be found'), {
          status: 404,
        });
      }
      await Post.findByIdAndDelete(postId);
  
      return new Response(JSON.stringify('Post deleted successfully'), {
        status: 200,
      });
    } catch (error) {
      return new Response(JSON.stringify('Server error while deleting the post'), {
        status: 500,
      });
    }
  };