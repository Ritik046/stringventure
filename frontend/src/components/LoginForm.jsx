import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, loginFailed, loginStart } from "../action";

const LoginForm = ({ changeForm }) => {
  const authDetails = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleForm = () => {
    changeForm("Register");
  };

  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!authDetails?.loading) {
      dispatch(loginStart());
      try {
        const detail = await axios.post(
          `${process.env.REACT_APP_API_URL}/user/login`,
          details
        );
        dispatch(loginUser(detail?.data));
      } catch (err) {
        dispatch(loginFailed(err?.response?.data));
      }
    }
  };

  const handleChanges = (type, value) => {
    if (type === "email") {
      setDetails((prevValue) => ({
        ...prevValue,
        email: value,
      }));
    } else {
      setDetails((prevValue) => ({
        ...prevValue,
        password: value,
      }));
    }
  };

  return (
    <div className="px-6 py-8 bg-gradient-to-r from-indigo-900 to-indigo-700 rounded-xl shadow-2xl">
      <p className="font-semibold text-3xl text-center text-white">Login</p>
      <p className="my-3 text-center text-sm font-semibold text-red-400">
        {authDetails.error?.message}
      </p>
      <form className="mt-5 text-center" onSubmit={handleSubmit}>
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
          className="md:w-[80%] md:my-5 bg-transparent border-b-2 border-indigo-400 text-white outline-none mt-5 p-3 w-[260px] rounded-md transition-all focus:border-indigo-500 placeholder-gray-300"
          placeholder="Password"
        />
        <button
          type="submit"
          className="mt-5 w-[260px] shadow-xl bg-gradient-to-br from-teal-500 to-teal-400 text-white font-semibold p-3 rounded-lg transition-all hover:from-teal-600 hover:to-teal-500"
        >
          Login
        </button>
      </form>
      <p className="text-sm mt-3 text-center text-white">
        Don't have an account?{" "}
        <span
          className="text-blue-200 underline cursor-pointer"
          onClick={handleForm}
        >
          Register
        </span>
      </p>
    </div>
  );
};

export default LoginForm;
