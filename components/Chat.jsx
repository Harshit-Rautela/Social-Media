'use client';
import { useState,useEffect } from "react";
import { io } from "socket.io-client";

let socket;

const Chat = ({userId, session})=>{
   const [messages, setMessages] = useState([])
   const [newMessage, setNewMessage] = useState("");
   useEffect(() => {
     socket = io();
     socket.emit('joinRoom',{userId:session?.user?.Id});
     socket.on('receiveMessage',(message)=>{
        setMessages((prev)=>[...prev,message]);
     });
     return () => {
        socket.disconnect();
      };
   }, [userId]);

   const sendMessage = async()=>{
    const messageData = {
        senderId: session.user.id,
        receiverId:userId,
        content:newMessage,
    }
   }
   
}

export default Chat;