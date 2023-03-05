import React, { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../Firebase";
import { BiSend } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const SendMsg = () => {
  const [value, setValue] = useState("");
  const [currentLength, setCurrentLength] = useState(0);
  const maxLength = 20;
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
        seenBy: [uid],
        status: "Delivered",
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
    setCurrentLength(0);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const words = inputValue.split(" ");
    const currentLength = words.filter((word) => word !== "").length;
    setCurrentLength(currentLength);

    if (currentLength > maxLength) {
      e.preventDefault();
      toast("Maximum Input Length");
    } else {
      setValue(inputValue);
    }
  };
  return (
    <div className="bg-gray-200 pb-5 w-full py-5 shadow-lg">
      <ToastContainer />
      <form onSubmit={handleSendMsg} className="px-2 containerWrap flex ">
        <input
          className="input w-full focus:outline-none bg-gray-100 rounded-r-none"
          type="text"
          value={value}
          onChange={handleInputChange}
        />
        <div className="text-sm px-2 text-gray-400 flex items-center">
          {currentLength}/{maxLength} words
        </div>
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
