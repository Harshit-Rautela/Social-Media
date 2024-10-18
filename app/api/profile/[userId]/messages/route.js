import { connectToDB } from "@utils/database";
import Message from "@models/Message";
import Profile from "@models/Profile";
import User from "@models/User";

export const POST = async (req, { params }) => {
  await connectToDB();
  const { senderId, receiverId, content } = await req.json();
  try {
    const isUser = await User.findById(receiverId);

    if (!isUser) {
      return new Response(
        JSON.stringify(
          "You cannot send a message to this user since it is not valid"
        ),
        {
          status: 404,
        }
      );
    }
    const message = await Message.create({
      senderId,
      receiverId,
      content,
    });
    await message.save();
    await Profile.updateOne(
      { userId: senderId },
      { $push: { messages: message._id } }
    );
    await Profile.updateOne(
      { userId: receiverId },
      { $push: { messages: message._id } }
    );

    return new Response(JSON.stringify(message), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify("Server Error"), {
      status: 500,
    });
  }
};

export const GET = async (req, { params }) => {
  await connectToDB();
  const { userId } = params;
  const senderId = req.nextUrl.searchParams.get("senderId");

  try {
    const isUser = await User.findById(userId);
    if (!isUser) {
      return new Response(
        JSON.stringify(
          "You cannot get message conversation with this user since it is not valid"
        ),
        {
          status: 404,
        }
      );
    }

    let messages = await Message.find({
      $or: [
        { senderId: senderId, receiverId: userId },
        { senderId: userId, receiverId: senderId },
      ],
    }).sort({ createdAt: 1 });

    return new Response(JSON.stringify(messages), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify("Server Error"), {
      status: 500,
    });
  }
};
