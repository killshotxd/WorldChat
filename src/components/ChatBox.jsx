import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import {
  collection,
  query,
  where,
  onSnapshot,
  QuerySnapshot,
  doc,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../Firebase";
import { useParams } from "react-router-dom";
const ChatBox = () => {
  const messagesEndRef = useRef();
  const [messages, setMessages] = useState([]);
  const { privateRoom } = useParams();

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    let q;
    if (privateRoom && privateRoom !== "chat") {
      // If the room name is in the route params, it's a private room
      q = query(
        collection(db, "privateRooms", `${privateRoom}/messages`),

        orderBy("createdAt"),
        limit(50)
      );
    } else {
      // Otherwise, it's the world chat
      q = query(collection(db, "messages"), orderBy("createdAt"), limit(50));
    }
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return () => unsubscribe;
  }, [privateRoom]);

  return (
    <div className="pb-44 pt-20 containerWrap">
      {messages.map((msg) => (
        <Message key={msg.id} msg={msg} />
      ))}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default ChatBox;
