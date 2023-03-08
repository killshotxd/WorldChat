import React, { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  collection,
  doc,
  addDoc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../Firebase";
import meet from "../assets/meetme.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const RoomCreate = () => {
  const navigate = useNavigate();
  const { currentUser } = UserAuth();

  const [roomName, setRoomName] = useState("");
  const [uniqueName, setUniqueName] = useState("");
  const handleCreateRoom = async (e) => {
    e.preventDefault();

    if (roomName.trim() === "") {
      const length = 5;
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let newRoomName = "";
      for (let i = 0; i < length; i++) {
        newRoomName += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
      setUniqueName(newRoomName);

      const { uid } = currentUser;
      await addDoc(collection(db, "privateRooms", uniqueName, "messages"), {
        text: `Welcome to ${uniqueName}!`,
        name: "ChatBot",
        avatar:
          "https://github.com/killshotxd/WorldChat/blob/main/src/assets/meetme.png?raw=true",
        createdAt: new Date(),
        uid: "ChatBot",
      });
      await setDoc(doc(collection(db, "privateRooms"), uniqueName), {
        uniqueName,
        createdBy: uid,
        createdAt: new Date(),
        users: [uid],
      });
      toast("🔥 New private room is created !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,

        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate(`../privateRoom/private/${uniqueName}`, { replace: true });
      return;
    }
    try {
      // check if the room already exists and has less than two users
      const existingRoom = await getDoc(
        doc(collection(db, "privateRooms"), roomName)
      );
      const joinedUsers = existingRoom?.data()?.users || [];
      const { uid } = currentUser;

      if (
        existingRoom.exists() &&
        joinedUsers.length < 2 &&
        !joinedUsers.includes(uid)
      ) {
        // add the current user to the existing room
        await updateDoc(doc(collection(db, "privateRooms"), roomName), {
          users: arrayUnion(uid),
        });

        toast("🔥 You have joined the private room!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate(`../privateRoom/private/${roomName}`, { replace: true });
      } else if (joinedUsers.includes(uid)) {
        toast("😉 You are already in the room", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate(`../privateRoom/private/${roomName}`, { replace: true });
      } else {
        console.log("This room is full!");
        toast("😉 This room is full!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <ToastContainer />
      <div className="containerWrap">
        <div className="hero-content text-center">
          <div className=" max-w-lg ">
            <h1 className="text-5xl font-bold">
              Welcome to our chat app, {currentUser.displayName}
            </h1>
            <p className="py-6">
              You have successfully logged in to our chat app. You can now join
              the worldwide conversation in the WorldChat room, or create a
              private room to chat with your friends and family.
            </p>
            <div className="flex flex-col  gap-3 max-w-sm content-center m-auto items-center">
              <button
                className="btn btn-secondary"
                onClick={() => {
                  navigate("/chat");
                }}
              >
                World Chat
              </button>
              <a href="#my-modal-2" className="btn btn-secondary">
                Private Room
              </a>
              {/* Put this part before </body> tag */}
              <input type="checkbox" id="my-modal" className="modal-toggle" />
              <label
                htmlFor="my-modal-2"
                className="modal cursor-pointer"
              ></label>
              <div className="modal" id="my-modal-2">
                <div className="modal-box">
                  <form
                    className="px-2 containerWrap"
                    onSubmit={handleCreateRoom}
                  >
                    <div className="flex flex-col gap-2 items-center content-center">
                      <p className="">
                        For Unique Private Room just click on create without any
                        input value!
                      </p>
                      <input
                        className="py-2 pl-3 px-2 outline-fuchsia-300 border-fuchsia-500 border rounded-md"
                        type="text"
                        placeholder="Custom Room Name...."
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                      />
                    </div>

                    <div className="modal-action">
                      <a href="#" className="btn">
                        Close
                      </a>
                      <button type="submit" className="btn btn-primary">
                        Create
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
    </div>
  );
};

export default RoomCreate;
