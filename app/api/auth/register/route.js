import { hash } from "bcryptjs";
import User from "@models/User";
import { connectToDB } from "@utils/database";
import { getSession, getToken } from "next-auth/react";
import nextAuth from "next-auth";
import Profile from "@models/Profile";
//just like in traditional express servers. we use res.json, in the nextJs, the specific syntax is new Response().
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
    const newUser = await User.create({
      userName: name,
      password: hashedPassword,
    });

    const newProfile = await Profile.create({
      userId: newUser._id,
    });
    return new Response(
      JSON.stringify({ user: newUser, profile: newProfile }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST /api/auth/register:", error.message);
    return new Response(JSON.stringify({ message: "Error creating user." }), {
      status: 500,
    });
  }
};
