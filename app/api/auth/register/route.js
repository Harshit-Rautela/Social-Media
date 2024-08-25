import { hash } from "bcryptjs";
import User from "@models/User";
import { connectToDB } from "@utils/database";

//just like in traditional express servers. we use req.json, in the nextJs, the specific syntax is new Response().
export const POST = async (req) => {
  try {
    const { name, password } = await req.json();

    if (!name || !password) {
      return new Response(
        JSON.stringify({ message: "All fields are required." }),
        {
          status: 400,
        }
      );
    }

    await connectToDB();
    const isUser = await User.findOne({ userName: name });

    if (isUser) {
      return new Response(JSON.stringify({ message: "User already exists." }), {
        status: 400,
      });
    }

    const hashedPassword = await hash(password, 10);
    const user = await User.create({
      userName: name,
      password: hashedPassword,
    });

    return new Response(JSON.stringify(user), {
      status: 201,
    });
  } catch (error) {
    console.error("Error in POST /api/auth/register:", error.message);
    return new Response(JSON.stringify({ message: "Error creating user." }), {
      status: 500,
    });
  }
};
