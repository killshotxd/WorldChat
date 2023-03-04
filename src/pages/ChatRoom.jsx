import React from "react";
import ChatBox from "../components/ChatBox";
import SendMsg from "../components/SendMsg";

const ChatRoom = () => {
  return (
    <>
      <h2 className="text-center text-2xl font-bold">Chat Room: World Chat</h2>
      <ChatBox />
      <SendMsg />
    </>
  );
};

export default ChatRoom;
