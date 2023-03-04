import React, { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { collection, doc, addDoc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../Firebase";
import meet from "../assets/meetme.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const RoomCreate = () => {
  const navigate = useNavigate();
  const { currentUser } = UserAuth();

  const [roomName, setRoomName] = useState("");

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    if (roomName.trim() === "") {
      toast("👎🏻 Enter Valid Room Name", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    try {
      const existingRoom = await getDoc(
        doc(collection(db, "privateRooms"), roomName)
      );
      if (existingRoom.exists()) {
        console.log("This room name is already taken!");
        toast("😉 Room Already Exists", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,

          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate(`../privateRoom/private/${roomName}`, { replace: true });

        // handle accordingly, maybe show an error message to the user
        return;
      }
      const { uid } = currentUser;
      await addDoc(collection(db, "privateRooms", roomName, "messages"), {
        text: `Welcome to ${roomName}!`,
        name: "ChatBot",
        avatar:
          "https://github.com/killshotxd/WorldChat/blob/main/src/assets/meetme.png?raw=true",
        createdAt: new Date(),
        uid: "ChatBot",
      });
      await setDoc(doc(collection(db, "privateRooms"), roomName), {
        roomName,
        createdBy: uid,
        createdAt: new Date(),
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
      navigate(`../privateRoom/private/${roomName}`, { replace: true });
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
                className="btn btn-primary"
                onClick={() => {
                  navigate("/chat");
                }}
              >
                World Chat
              </button>
              <a href="#my-modal-2" className="btn btn-primary">
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
                      <input
                        className="py-2 pl-3 px-2 outline-fuchsia-300 border-fuchsia-500 border rounded-md"
                        type="text"
                        placeholder="Room Name...."
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
