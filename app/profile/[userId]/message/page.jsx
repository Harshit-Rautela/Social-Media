"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaPaperPlane } from "react-icons/fa";

const Messages = ({ params }) => {
  const { userId } = params;
  const { data: session } = useSession();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    // if (!session) {
    //   console.log("No session found, redirecting...");
    //   router.push('/auth/login'); // Redirect to login if not authenticated
    //   return;
    // }

    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `/api/profile/${userId}/messages?senderId=${session.user.id}`
        );
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [userId, newMessage]);

  const handleSendMessage = async () => {
    try {
      await fetch(`/api/profile/${userId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderId: session.user.id,
          receiverId: userId,
          content: newMessage,
        }),
      });
      setMessages([
        ...messages,
        { senderId: session.user.id, content: newMessage },
      ]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Chat with {userId}</h2>
        <div className="overflow-auto h-64 mb-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 ${
                msg.senderId === session.user.id ? "text-right" : "text-left"
              }`}
            >
              <span
                className={`inline-block py-2 px-4 ${
                  msg.senderId === session.user.id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-800"
                } rounded-lg`}
              >
                {msg.content}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="border rounded p-2 flex-grow mr-2"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Messages;
