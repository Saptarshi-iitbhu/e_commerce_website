import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaSearch, FaShoppingBasket } from "react-icons/fa";
import { RiUserLine } from "react-icons/ri";
import userImg from "../assets/user.png";
import { ShopContext } from "../Context/ShopContext";

const Header = () => {
  const {
    user,
    navigate,
    searchQuery,
    setSearchQuery,
    setShowUserLogin,
    getCartCount,
    logoutUser
  } = useContext(ShopContext);

  const location = useLocation();
  const isCollection = location.pathname.endsWith("/collection");

  useEffect(() => {
    if (searchQuery.length > 0 && !isCollection) {
      navigate("/collection");
    }
  }, [searchQuery]);

  return (
    <header className="w-full bg-white text-gray-900 shadow-md sticky top-0 z-50">
      {/* Top Row */}
      <div className="max-padd-container flex items-center justify-between py-3">
        {/* Logo */}
        <Link
          to="/"
          className="bold-22 uppercase font-paci hover:text-gray-600 transition-colors duration-300"
        >
          Shopper <span className="text-gray-500 bold-28">.</span>
        </Link>

        {/* Search Bar (desktop) */}
        <div className="hidden sm:flex flex-1 mx-6">
          <div className="flex w-full rounded-full overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-gray-100">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 p-3 text-gray-900 bg-gray-100 outline-none placeholder-gray-500 rounded-l-full"
            />
            <button className="bg-gray-300 p-3 flex items-center justify-center rounded-r-full hover:bg-gray-400 transition-colors duration-300">
              <FaSearch className="text-gray-900 text-lg" />
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6 text-gray-900">
          {/* User */}
          <div className="group relative">
            {user ? (
              <div className="flex items-center gap-2 cursor-pointer">
                <img
                  src={userImg}
                  alt="user"
                  height={40}
                  width={40}
                  className="rounded-full border-2 border-gray-300 hover:scale-105 transition-transform duration-300"
                />
                <span className="hidden sm:block">Hello, User</span>
              </div>
            ) : (
              <button
                onClick={() => setShowUserLogin(true)}
                className="flex items-center gap-x-2 px-4 py-2 bg-gray-200 rounded-full text-gray-900 font-semibold shadow-sm hover:scale-105 hover:bg-gray-300 transition-all duration-300"
              >
                <RiUserLine className="text-lg text-gray-900" />
                <span className="hidden sm:block">Login</span>
              </button>
            )}

            {/* Dropdown Menu */}
            {user && (
              <ul className="bg-gray-100 text-gray-900 p-2 w-40 rounded absolute right-0 top-12 hidden group-hover:flex flex-col text-sm shadow-md z-50">
                <li
                  onClick={() => navigate("/my-orders")}
                  className="p-2 hover:bg-gray-200 cursor-pointer rounded"
                >
                  Orders
                </li>
                <li onClick={logoutUser} className="p-2 hover:bg-gray-200 cursor-pointer rounded">Logout</li>
              </ul>
            )}
          </div>

          {/* Cart */}
          <div
            onClick={() => navigate("/cart")}
            className="relative flex items-center cursor-pointer hover:scale-110 transition-transform duration-300"
          >
            <FaShoppingBasket size={28} className="text-gray-900" />
            <span className="absolute -top-2 -right-3 bg-gray-300 text-gray-900 text-xs px-2 py-0.5 rounded-full animate-pulse">
              {getCartCount()}
            </span>
          </div>
        </div>
      </div>

      {/* Search Bar (mobile only) */}
      <div className="sm:hidden px-3 pb-3">
        <div className="flex w-full rounded-full overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-gray-100">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="flex-1 p-3 text-gray-900 bg-gray-100 outline-none placeholder-gray-500 rounded-l-full"
          />
          <button className="bg-gray-300 p-3 flex items-center justify-center rounded-r-full hover:bg-gray-400 transition-colors duration-300">
            <FaSearch className="text-gray-900 text-lg" />
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white text-gray-900">
        <div className="w-full">
          <ul className="flex justify-between items-center text-[12px] sm:text-sm font-bold px-2">
            <li className="flex-1 text-center cursor-pointer hover:text-gray-500 transition-colors duration-300">
              <Link to="/">HOME</Link>
            </li>
            <li className="flex-1 text-center cursor-pointer hover:text-gray-500 transition-colors duration-300">
              <Link to="/collection">COLLECTION</Link>
            </li>
            <li className="flex-1 text-center cursor-pointer hover:text-gray-500 transition-colors duration-300">
              <Link to="/testimonial">TESTIMONIAL</Link>
            </li>
            <li className="flex-1 text-center cursor-pointer hover:text-gray-500 transition-colors duration-300">
              <Link to="/contact">CONTACT</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
