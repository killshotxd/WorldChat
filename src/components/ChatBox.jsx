import React from "react";
import Message from "./Message";

const ChatBox = () => {
  const messages = [
    {
      id: 1,
      text: "Hello There!",
      name: "Hassan",
    },
    {
      id: 2,
      text: "ohi!",
      name: "Imran",
    },
  ];
  return (
    <div className="pb-44 pt-20 containerWrap">
      {messages.map((msg) => (
        <Message key={msg.id} msg={msg} />
      ))}
    </div>
  );
};

export default ChatBox;
