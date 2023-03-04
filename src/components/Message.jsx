import React, { useEffect } from "react";
import { UserAuth } from "../context/AuthContext";

import moment from "moment";
const Message = ({ msg, onReadReceipt, receiverData, index, lastIndex }) => {
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
        {index === lastIndex && (
          <div className="chat-footer flex items-center gap-1 ">
            <div className="opacity-50">{status}</div>
            {msg.uid == currentUser.uid && status === "Seen" && (
              <div className="w-4 rounded-full">
                <img className="rounded-full" src={receiverData?.avatar} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
