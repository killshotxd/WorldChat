import React, { useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { currentUser, signInGoogle } = UserAuth();
  console.log(currentUser);

  const handleLogin = async () => {
    try {
      await signInGoogle();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/chat");
    } else return;
  }, [currentUser]);

  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url("/images/stock/photo-1507358522600-9f71e620c44e.jpg")`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">
              Login to this World Chat and chat endlessly with every one.
              <strong>
                (Use of Inappropriate or Spam random stuff will impose immediate
                ban and keep in mind you cannot delete anything from your
                end.🙂)
              </strong>
              <br />
              <strong>Happy Chatting😁</strong>
            </p>

            <button
              onClick={handleLogin}
              className="btn  bg-neutral text-neutral-content"
            >
              {" "}
              LOGIN WITH GOOGLE
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
