import React, { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../Firebase";
import { BiSend } from "react-icons/bi";
const SendMsg = () => {
  const [value, setValue] = useState("");
  const { currentUser } = UserAuth();
  const handleSendMsg = async (e) => {
    e.preventDefault();
    if (value.trim() === "") {
      alert("Enter valid Message!");
      return;
    }
    try {
      const { uid, displayName, photoURL } = currentUser;
      await addDoc(collection(db, "messages"), {
        text: value,
        name: displayName,
        avatar: photoURL,
        createdAt: serverTimestamp(),
        uid,
      });
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
        <button className="w-auto flex bg-gray-500 text-white rounded-r-lg px-5 py-2 gap-2 items-center justify-center m-0 text-sm">
          Send <BiSend />
        </button>
      </form>
    </div>
  );
};

export default SendMsg;
