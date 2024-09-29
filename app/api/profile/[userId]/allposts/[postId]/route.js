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