import React from "react";

const Message = ({ msg }) => {
  return (
    <div>
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>
        <div className="chat-header">
          {msg.name}
          {/* <time className="text-xs opacity-50">12:45</time> */}
        </div>
        <div className="chat-bubble">{msg.text}</div>
        <div className="chat-footer opacity-50">Delivered</div>
      </div>
    </div>
  );
};

export default Message;
