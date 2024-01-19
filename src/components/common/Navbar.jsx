import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../services/operations/authAPI";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  // const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOut = () => {
    dispatch(logout(navigate));
  };
  return (
    <div className="w-screen h-14 border-b border-b-slate-700 bg-slate-800 flex items-center justify-center">
      <div className="w-11/12 max-w-maxContent flex items-center justify-between gap-8">
        <Link to="/">
          <p className="text-xl font-semibold text-white">
            Profile Management System
          </p>
        </Link>

        <div className="flex justify-center items-center gap-5">
          {token === null && (
            <Link to="/">
              <button
                className="border
              border-slate-700 rounded-lg text-slate-500 bg-slate-800 px-3 py-2 font-inter font-medium text-[16px] leading-6 text-center"
              >
                Log In
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button
                className="border
              border-slate-700 rounded-lg text-slate-500 bg-slate-800 px-3 py-2 font-inter font-medium text-[16px] leading-6 text-center"
              >
                Sign Up
              </button>
            </Link>
          )}
          {token !== null && (
            <button
              className="border
              border-slate-700 rounded-lg text-slate-500 bg-slate-800 px-3 py-2 font-inter font-medium text-[16px] leading-6 text-center"
              onClick={logOut}
            >
              Log Out
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
