import React from "react";

const Navbar = () => {
  return (
    <div className="navbar bg-neutral text-neutral-content">
      <div className="containerWrap ">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">WorldChat</a>
        </div>
        <div className="flex align-middle gap-2">
          <button>Logout</button>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-neutral text-neutral-content rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge badge-secondary">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;