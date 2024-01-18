import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../services/operations/authAPI";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleOnChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { name, email, password } = formData;

  const handleOnSubmit = (e) => {
    e.preventDefault();

    dispatch(signUp(name, email, password, navigate));

    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] justify-center items-center bg-slate-900">
      <form
        onSubmit={handleOnSubmit}
        className="flex w-full max-w-[450px] flex-col gap-y-4"
      >
        <label className="w-full flex flex-col gap-[2px]">
          <p className="mb-1 text-[0.875rem] leading-[0.375rem] text-white">
            Name <sup className="text-[red]">*</sup>
          </p>
          <input
            type="text"
            required
            name="name"
            value={name}
            onChange={handleOnChange}
            placeholder="Enter First Name"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-slate-800 p-[12px] text-white"
          />
        </label>
        <label className="w-full flex flex-col gap-[2px]">
          <p className="mb-1 text-[0.875rem] leading-[0.375rem] text-white">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            type="email"
            required
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter Email"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-slate-800 p-[12px] text-white"
          />
        </label>
        <label className="w-full relative flex flex-col gap-[2px]">
          <p className="mb-1 text-[0.875rem] leading-[0.375rem] text-white">
            Password <sup className="text-[red]">*</sup>
          </p>
          <input
            type={showPassword ? "text" : "password"}
            required
            name="password"
            value={password}
            onChange={handleOnChange}
            placeholder="Enter Password"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-slate-800 p-[12px] text-white"
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-[22px] z-10 cursor-pointer"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
            ) : (
              <AiOutlineEye fontSize={24} fill="#AFB2BF" />
            )}
          </span>
        </label>
        <button
          type="submit"
          className="mt-6 rounded-[8px] bg-[yellow] py-[8px] px[12px] font-medium text-slate-900"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Signup;
