import React from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { currentUser, logout } = UserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error();
    }
  };
  return (
    <div className="navbar bg-neutral text-neutral-content">
      <div className="containerWrap ">
        <div className="flex-1">
          <a
            className="btn btn-ghost normal-case text-xl"
            onClick={() => {
              navigate("/room");
            }}
          >
            WorldChat
          </a>
        </div>
        {currentUser ? (
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={currentUser.photoURL} />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-neutral text-neutral-content rounded-box w-52"
              >
                <li>
                  <a className="justify-between">
                    {currentUser.displayName}
                    <span className="badge badge-secondary">New</span>
                  </a>
                </li>

                <li onClick={handleLogout}>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Navbar;
