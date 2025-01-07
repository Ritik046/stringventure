import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, loginFailed, loginStart } from "../action";

const RegisterForm = ({ changeForm }) => {
  const registerDetails = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [details, setDetails] = useState({
    username: "",
    email: "",
    password: "",
    cnfrmPassword: "",
  });

  const handleForm = () => {
    changeForm("Login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const detail = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/register`,
        {
          username: details?.username,
          email: details?.email,
          password: details?.password,
        }
      );
      dispatch(loginUser(detail?.data));
    } catch (err) {
      console.log(err);
      dispatch(loginFailed(err?.response?.data));
    }
  };

  const handleChanges = (key, value) => {
    setDetails((prevValue) => ({
      ...prevValue,
      [key]: value,
    }));
  };

  return (
    <div className="px-6 py-8 bg-gradient-to-r from-indigo-900 to-indigo-700 rounded-xl shadow-2xl">
      <p className="font-semibold text-3xl text-center text-white">Register</p>
      <p className="my-3 text-center text-sm font-semibold text-red-400">
        {registerDetails.error?.message}
      </p>
      <form className="mt-5 text-center" onSubmit={handleSubmit}>
        <input
          onChange={(e) => handleChanges("username", e.target.value)}
          required
          type="text"
          className="md:w-[80%] bg-transparent border-b-2 border-indigo-400 text-white outline-none mt-5 p-3 w-[260px] rounded-md transition-all focus:border-indigo-500 placeholder-gray-300"
          placeholder="Username.."
        />
        <input
          onChange={(e) => handleChanges("email", e.target.value)}
          required
          type="email"
          className="md:w-[80%] bg-transparent border-b-2 border-indigo-400 text-white outline-none mt-5 p-3 w-[260px] rounded-md transition-all focus:border-indigo-500 placeholder-gray-300"
          placeholder="Email address.."
        />
        <input
          onChange={(e) => handleChanges("password", e.target.value)}
          required
          type="password"
          className="md:w-[80%] bg-transparent border-b-2 border-indigo-400 text-white outline-none mt-5 p-3 w-[260px] rounded-md transition-all focus:border-indigo-500 placeholder-gray-300"
          placeholder="Password"
        />
        <input
          onChange={(e) => handleChanges("cnfrmPassword", e.target.value)}
          required
          type="password"
          className="md:w-[80%] bg-transparent border-b-2 border-indigo-400 text-white outline-none mt-5 p-3 w-[260px] rounded-md transition-all focus:border-indigo-500 placeholder-gray-300"
          placeholder="Confirm Password"
        />
        <button
          type="submit"
          className="mt-5 w-[260px] shadow-xl bg-gradient-to-br from-teal-500 to-teal-400 text-white font-semibold p-3 rounded-lg transition-all hover:from-teal-600 hover:to-teal-500"
        >
          Register
        </button>
      </form>
      <p className="text-sm mt-3 text-center text-white">
        Already have an account?{" "}
        <span
          onClick={handleForm}
          className="text-blue-200 underline cursor-pointer"
        >
          Login
        </span>
      </p>
    </div>
  );
};

export default RegisterForm;
