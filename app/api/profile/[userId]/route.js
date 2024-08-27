import { connectToDB } from "@utils/database";
import Profile from "@models/Profile";

export const GET = async(req,{params})=>{
   try {
    await connectToDB();
    const {userId} = params;
    const profile = await Profile.findOne({userId});
    if(!profile){
        return new Response(JSON.stringify('Profile is not present'),{
            status:404
        })
    }
    return new Response(JSON.stringify(profile),{
        status:200
    })
    
   } catch (error) {
    return new Response(JSON.stringify({ message: "Error fetching profile" }), {
        status: 500,
      });
   }
}