// src/components/Dashboard/Topbar.js
import React, { useState } from "react";
import { Search, Settings, User, LogOut, Bell } from "lucide-react";
import NotificationsPanel from "./NotificationsPanel";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Store/userSlice";
import AuthService from "../../scripts/API.Login";
import { useNavigate } from "react-router-dom";

const TopBar = ({ searchQuery, setSearchQuery }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userInfo.avatar);
  const APT = new AuthService();

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleNavigateToSettings = () => {
    navigate("/main/settings");
  };

  return (
    <div className="relative text-red-900 shadow-md bg-gradient-to-r from-red-400 to-red-200">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo and Title */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-white rounded-lg">
                <span className="text-2xl font-bold text-red-600">E</span>
              </div>
              <h1 className="text-2xl font-semibold text-white">Evolution</h1>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 pl-10 pr-4 text-red-900 placeholder-red-500 rounded-md bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <Search className="absolute w-5 h-5 text-red-500 transform -translate-y-1/2 left-3 top-1/2" />
          </div>

          {/* User Options */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button
              onClick={toggleNotifications}
              className="relative p-2 rounded-full hover:bg-red-300"
            >
              <Bell className="w-5 h-5 text-red-600" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full"></span>
            </button>

            {/* Settings */}
            <button
              onClick={handleNavigateToSettings}
              className="p-2 rounded-full hover:bg-red-300"
            >
              <Settings className="w-5 h-5 text-red-600" />
            </button>

            {/* Profile */}
            <button className="p-2 rounded-full hover:bg-red-300">
              {user ? (
                <img
                  src={user}
                  alt="user"
                  className="w-8 h-8 text-red-600 rounded-circle"
                />
              ) : (
                <User className="w-5 h-5 text-red-600" />
              )}
            </button>

            {/* Logout */}
            <button
              className="p-2 rounded-full hover:bg-red-300"
              onClick={() => {
                dispatch(logout());
                APT.logout();
              }}
            >
              <LogOut className="w-5 h-5 text-red-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Notifications Panel */}
      {showNotifications && (
        <div className="absolute right-0 w-full max-w-xs mt-2 top-full">
          <NotificationsPanel />
        </div>
      )}
    </div>
  );
};

export default TopBar;