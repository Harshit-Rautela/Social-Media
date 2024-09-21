import { connectToDB } from "@utils/database";
import User from "@models/User";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const name = searchParams.get('name');
    if (!name) {
      return new Response(JSON.stringify("Please send a name"), {
        status: 404,
      });
    }
    const user = await User.find({
      userName: { $regex: name, $options: "i" },
    }).select("userName _id");
    return new Response(JSON.stringify(user), {
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify('Server could not find the user'), {
        status: 500,
      });
  }
};
