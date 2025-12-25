import React, { useState } from "react";
import { assets } from "./../assets/assets";
import { NavLink, Navigate, useNavigate } from "react-router-dom";

import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400 ">
      <img
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt=""
      />

      <ul className="hidden md:flex font-medium  items-start gap-5 ">
        <NavLink to={"/"}>
          <li className="py-1">Home</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>

        <NavLink to={"/doctors"}>
          <li className="py-1">All Doctors</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/about"}>
          <li className="py-1">About</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/contact"}>
          <li className="py-1">Contact</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center">
        {token && userData ? (
          <div
            className="flex items-center gap-2 cursor-pointer relative group"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <img
              className="w-10 h-10 rounded-full"
              src={userData.image}
              alt=""
            />
            <img src={assets.dropdown_icon} alt="" className="w-2.5" />

            {/* Desktop: hover dropdown */}
            <div className="absolute top-0 right-4 pt-14 text-base font-medium text-gray-600 hidden group-hover:block z-20">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col p-4 gap-4">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-appointments")}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointments
                </p>
                <p onClick={logout} className="hover:text-black cursor-pointer">
                  Logout
                </p>
              </div>
            </div>

            {/* Mobile: click dropdown */}
            {showDropdown && (
              <div className="absolute top-full right-0 mt-4 text-base font-medium text-gray-600 z-20 min-w-48 bg-stone-100 rounded flex flex-col p-4 gap-4 md:hidden">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-appointments")}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointments
                </p>
                <p
                  onClick={() => {
                    setToken(false);
                    navigate("/login");
                    setShowDropdown(false);
                  }}
                  className="hover:text-black cursor-pointer"
                >
                  Logout
                </p>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary hover:bg-blue-600 hover:scale-105 transition-all duration-300 text-white rounded-full px-8 py-3 font-light hidden md:block"
          >
            Create account
          </button>
        )}
        <img
          className="w-6 ml-3 md:hidden"
          onClick={() => setShowMenu(true)}
          src={assets.menu_icon}
          alt=""
        />
        <div
          className={`${
            showMenu ? "w-full fixed " : "w-0 h-0"
          } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all duration-200`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <img className="w-36" src={assets.logo} alt="" />
            <img
              className="w-7"
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt=""
            />
          </div>
          <ul className="flex flex-col items-center gap-2 font-medium mt-5 px-5 text-lg">
            <NavLink onClick={() => setShowMenu(false)} to={"/"}>
              <p className="px-4 py-2 rounded inline-block"> Home</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to={"/doctors"}>
              <p className="px-4 py-2 rounded inline-block"> All Doctors</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to={"/about"}>
              <p className="px-4 py-2 rounded inline-block"> About</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to={"/contact"}>
              <p className="px-4 py-2 rounded inline-block"> Contact</p>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
