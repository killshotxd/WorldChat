import React from "react";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import ChatRoom from "./pages/ChatRoom";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./routes/PrivateRoute";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <ChatRoom />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
