import React, { useEffect } from "react";
import { UserAuth } from "../context/AuthContext";

import moment from "moment";
const Message = ({ msg, onReadReceipt }) => {
  const timestamp = moment(msg?.createdAt?.toDate());
  const relativeTime = timestamp?.fromNow();

  const { currentUser } = UserAuth();

  useEffect(() => {
    if (onReadReceipt) {
      onReadReceipt(msg);
    }
  }, [onReadReceipt, msg]);

  let status;
  if (msg.uid === currentUser.uid) {
    status = msg.status || (msg.seenBy ? "Delivered" : "");
  } else {
    status =
      msg.status ||
      (msg.seenBy && msg.seenBy.indexOf(currentUser.uid) !== -1
        ? "Seen"
        : "Delivered");
  }
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
        <div className="chat-footer opacity-50">{status}</div>
      </div>
    </div>
  );
};

export default Message;
