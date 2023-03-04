import React, { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../Firebase";
import { BiSend } from "react-icons/bi";
import { useParams } from "react-router-dom";
const SendMsg = () => {
  const [value, setValue] = useState("");
  const { currentUser } = UserAuth();
  const { privateRoom } = useParams();
  const handleSendMsg = async (e) => {
    e.preventDefault();
    if (value.trim() === "") {
      alert("Enter valid Message!");
      return;
    }

    try {
      const { uid, displayName, photoURL } = currentUser;
      const messageData = {
        text: value,
        name: displayName,
        avatar: photoURL,
        createdAt: serverTimestamp(),
        uid,
      };

      if (privateRoom) {
        // If the room name is in the route params, it's a private room
        await addDoc(
          collection(db, "privateRooms", `${privateRoom}/messages`),
          messageData
        );
      } else {
        // Otherwise, it's the world chat
        await addDoc(collection(db, "messages"), messageData);
      }
    } catch (error) {
      console.log(error);
    }

    setValue("");
  };
  return (
    <div className="bg-gray-200 fixed bottom-0 w-full py-10 shadow-lg">
      <form onSubmit={handleSendMsg} className="px-2 containerWrap flex ">
        <input
          className="input w-full focus:outline-none bg-gray-100 rounded-r-none"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className="w-auto  bg-gray-500 text-white rounded-r-lg px-5  gap-2  text-sm">
          <p className="flex items-center text-xs gap-2">
            Send <BiSend />
          </p>
        </button>
      </form>
    </div>
  );
};

export default SendMsg;
