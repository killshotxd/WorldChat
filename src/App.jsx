import React from "react";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import ChatRoom from "./pages/ChatRoom";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./routes/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import RoomCreate from "./pages/RoomCreate";
import Private from "./pages/Private";
import Footer from "./components/Footer";

const App = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/room"
          element={
            <PrivateRoute>
              <RoomCreate />
            </PrivateRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <ChatRoom />
            </PrivateRoute>
          }
        />

        <Route
          path="/privateRoom/private/:privateRoom"
          element={
            <PrivateRoute>
              <Private />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </AuthProvider>
  );
};

export default App;
