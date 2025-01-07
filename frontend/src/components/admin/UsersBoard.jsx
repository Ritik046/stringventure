import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRegUserCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

const data = [
  "User Id",
  "User name",
  "Book in Hand",
  "Rented History",
  "Delete",
];

const UsersBoard = () => {
  const [userData, setUserData] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalInfo, setModalInfo] = useState(null);
  const [newInfo, setNewInfo] = useState({
    username: "",
    email: "",
    membership: "",
  });

  const getUsersData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/`
      );
      setUserData(response?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);

  const handleUpdate = (user) => {
    setModal((prev) => !prev);
    setModalInfo(user);
  };

  const handleChange = (type, value) => {
    setNewInfo((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleUserDel = async (user) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/user/delete/${user?._id}`
      );

      if (response.status === 200) {
        setUserData((prev) => {
          return prev.filter((val) => {
            return val._id !== user._id;
          });
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const commitUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/user/edit`,
        {
          id: modalInfo?._id,
          username: newInfo?.username,
          email: newInfo?.email,
        }
      );
      if (response?.status === 200) {
        setModal((prev) => !prev);
        console.log(response);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-[95%] h-max overflow-x-scroll scrollbar">
      <table className="w-[100%] border-collapse ">
        <thead>
          <tr className="bg-gradient-to-r from-indigo-900 to-indigo-700 text-white border-[1px] border-slate-300">
            {data?.map((header, idx) => (
              <th
                key={idx}
                className="p-3 text-center border-[0.5px] border-r-slate-400 min-w-fit whitespace-nowrap text-lg font-semibold"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {userData?.map((user, idx) => (
            <tr
              key={idx}
              className="bg-gradient-to-r from-slate-600 to-slate-500 text-white border-[1px] border-slate-200"
            >
              <td className="p-3 text-center border-[0.5px] border-r-slate-400 whitespace-nowrap">
                {user?.email}
              </td>
              <td className="p-3 text-center border-[0.5px] border-r-slate-400 whitespace-nowrap">
                {user?.username}
              </td>
              <td className="p-3 text-center border-[0.5px] border-r-slate-400 whitespace-nowrap">
                {user?.bookInHand?.length}
              </td>
              <td className="p-3 text-center border-[0.5px] border-r-slate-400 whitespace-nowrap">
                {user?.rentedHistory?.length}
              </td>
              <td className="p-3 text-center font-semibold border-[0.5px] border-r-slate-400 whitespace-nowrap">
                <button
                  onClick={() => handleUserDel(user)}
                  className="w-[100px] bg-gradient-to-br from-red-500 to-red-400 text-white p-1 rounded-md shadow-lg hover:opacity-90"
                >
                  DELETE
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      {modal && (
        <div className="absolute top-[15%] p-5 rounded-md shadow-xl left-[45%] sm:left-[5%] w-[450px] xsm:w-[98%] xsm:left-1 xsm:mt-1 xsm:p-2 h-max bg-gradient-to-r from-slate-800 to-slate-700 text-white">
          <div className="flex justify-end items-center mb-3 text-2xl">
            <div
              onClick={() => setModal((prev) => !prev)}
              className="cursor-pointer text-red-400 hover:text-red-500"
            >
              <MdCancel />
            </div>
          </div>
          <form
            onSubmit={commitUpdate}
            className="flex flex-col justify-center items-start"
          >
            <label className="text-lg font-semibold">Username</label>
            <input
              onChange={(e) => handleChange("username", e.target.value)}
              className="w-[100%] mb-3 p-3 bg-slate-600 text-white rounded-md"
              type="text"
              placeholder="Username"
              defaultValue={modalInfo?.username}
            />
            <label className="text-lg font-semibold">Email</label>
            <input
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-[100%] mb-3 p-3 bg-slate-600 text-white rounded-md"
              type="email"
              placeholder="Email"
              defaultValue={modalInfo?.email}
            />
            <label className="text-lg font-semibold">Membership Status</label>
            <input
              className="w-[100%] mb-3 p-3 bg-slate-600 text-white rounded-md"
              type="text"
              placeholder="Membership"
              defaultValue={modalInfo?.membership}
            />
            <button
              type="submit"
              className="mx-auto w-[200px] bg-gradient-to-br from-emerald-600 to-emerald-500 text-white font-semibold p-3 rounded-lg mt-3 shadow-md hover:opacity-90"
            >
              Update
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UsersBoard;
