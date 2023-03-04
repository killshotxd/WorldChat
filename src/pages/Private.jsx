import React from "react";
import ChatBox from "../components/ChatBox";
import SendMsg from "../components/SendMsg";
import { useParams } from "react-router-dom";
const Private = () => {
  const { privateRoom } = useParams();
  console.log(privateRoom);
  return (
    <div>
      <h2 className="text-center text-2xl font-bold">
        Chat Room: {privateRoom}
      </h2>
      <ChatBox />
      <SendMsg />
    </div>
  );
};

export default Private;
