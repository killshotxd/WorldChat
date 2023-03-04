import React from "react";
import { UserAuth } from "../context/AuthContext";

import moment from "moment";
const Message = ({ msg }) => {
  const timestamp = moment(msg.createdAt.toDate());
  const relativeTime = timestamp.fromNow();
  console.log(relativeTime);
  const { currentUser } = UserAuth();

  return (
    <div>
      <div
        className={`chat ${
          msg.uid === currentUser.uid ? "chat-end" : "chat-start"
        }`}
      >
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img src={msg.avatar} />
          </div>
        </div>
        <div className="chat-header gap-1 flex items-center">
          {msg.name}
          <time className="text-xs opacity-50">{relativeTime}</time>
        </div>
        <div className="chat-bubble">{msg.text}</div>
        <div className="chat-footer opacity-50">Delivered</div>
      </div>
    </div>
  );
};

export default Message;
