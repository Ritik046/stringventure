import React, { useState } from "react";
import axios from "axios";
// import { BsStarFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import star from "../assets/star-dynamic-premium.png";
import CardTemplate from "./CardTemplate";
import { addProgFavBooka, open } from "../action";

const BookSlider = ({ data, title, setFavMsg, setErrMsg }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toggler = useSelector((state) => state.toggler);
  const userInfo = useSelector((state) => state.user);
  const books = useSelector((state) => state.books);

  const handleBook = (value) => {
    navigate(`/book/${value?._id}`);
  };

  const handleFav = async (value) => {
    try {
      if (userInfo?.user) {
        const dataToSend = {
          userId: userInfo?.user?.id,
          bookId: value?._id,
        };
        const response = await axios.put(
          `${process.env.REACT_APP_API_URL}/user/addFav`,
          dataToSend
        );
        setFavMsg(response?.data?.message);
        dispatch(addProgFavBooka(value?._id));
        setTimeout(() => setFavMsg(""), 3000);
      } else {
        dispatch(open());
      }
    } catch (err) {
      setErrMsg(err?.response?.data?.message);
      setTimeout(() => setErrMsg(""), 3000);
    }
  };

  return (
    <div className="mt-4">
      <p className="text-3xl sm:text-2xl font-bold text-slate-200">{title}</p>
      <div className="flex justify-start items-center p-1 overflow-x-auto no-scrollbar">
        {data ? (
          data?.map((data, idx) => {
            return (
              <div
                key={idx}
                className="mx-3 md:mx-2 cursor-pointer bg-gradient-to-t from-gray-900 to-gray-700 rounded-lg shadow-lg p-2"
              >
                <div
                  onClick={() => handleBook(data)}
                  className="w-[220px] sm:w-[160px] h-[320px] sm:h-[220px] bg-gray-800 rounded-md overflow-hidden"
                >
                  <img
                    alt={data?.bookname.slice(0, 5)}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    src={data?.bookImage}
                  ></img>
                </div>
                <div className="flex justify-between items-center pr-2 mt-2">
                  <div className="flex justify-around items-center bg-gradient-to-r from-yellow-400 to-yellow-300 w-max px-3 py-1 rounded-md">
                    <img
                      alt={data?.bookImage}
                      className="w-5 rotate-6"
                      src={star}
                    ></img>
                    <p className="ml-1 font-bold text-gray-800">
                      {data?.rating}
                    </p>
                  </div>
                  <div
                    style={{
                      color: books?.favourite?.includes(data?._id)
                        ? "orange"
                        : "white",
                    }}
                    onClick={() => handleFav(data)}
                    className="z-10 mt-1 text-xl cursor-pointer"
                  >
                    {/* <BsStarFill /> */}
                  </div>
                </div>
                <p className="mt-2 font-bold text-gray-200 text-lg sm:text-sm">
                  {data?.bookname.slice(0, 17)}...
                </p>
                <p className="text-gray-400 text-sm">{data?.authorname}</p>
              </div>
            );
          })
        ) : (
          <CardTemplate />
        )}
      </div>
    </div>
  );
};

export default BookSlider;
