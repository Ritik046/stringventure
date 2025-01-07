import React, { useState, useEffect } from "react";
import axios from "axios";
import { acceptReq, declineReq } from "../../action";
import { useDispatch, useSelector } from "react-redux";

const data = [
  "S.NO",
  "User Id",
  "Book Id",
  "Book Name",
  "Author Name",
  "From (YYYY-MM-DD)",
  "Till (YYYY-MM-DD)",
  "Accept Request",
  "Decline Request",
];

const RequestsBoard = () => {
  const dispatch = useDispatch();
  const adminInfos = useSelector((state) => state.admin);
  const [reqData, setReqData] = useState([]);

  const getRequestsData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/books/request/all`
      );
      setReqData(response?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRequestsData();
  }, []);

  const handleAcceptance = async (userId, bookId) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/books/request/one`,
        {
          userId: userId,
          bookId: bookId,
        }
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRequest = (action, value) => {
    if (action === "accept") {
      if (!isFound(value?.userId, value?.bookId)) {
        dispatch(acceptReq([value]));
        handleAcceptance(value?.userId, value?.bookId);
      }
    } else {
      console.log("Decline");
    }
  };

  const isFound = (userId, bookId) => {
    const bool = adminInfos?.acceptedRequest?.some((obj) => {
      return obj?.userId === userId && obj?.bookId === bookId;
    });
    return bool;
  };

  return (
    <div className="w-[95%] min-h-max max-h-[98%] overflow-x-auto overflow-y-auto scrollbar">
      <table className="w-[100%] border-collapse">
        <thead>
          <tr className="sticky bg-blue-800 z-10 top-0 left-0 right-0 border-[1px] border-blue-300 text-white">
            {data?.map((data, idx) => {
              return (
                <th
                  key={idx}
                  className="p-3 border-[0.5px] border-r-blue-500 text-lg font-medium text-center whitespace-nowrap"
                >
                  {data}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {reqData?.map((data, idx) => {
            return (
              <tr
                style={{
                  opacity: isFound(data?.userId, data?.bookId) ? "0.5" : "1",
                }}
                key={idx}
                className="bg-gray-700 text-white border-[1px] border-blue-300"
              >
                <td className="p-3 text-center border-[1px] border-r-blue-500">
                  {idx + 1}
                </td>
                <td className="p-3 text-center border-[1px] border-r-blue-500">
                  {data?.userId}
                </td>
                <td className="p-3 text-center border-[1px] border-r-blue-500">
                  {data?.bookId}
                </td>
                <td className="p-3 text-center border-[1px] border-r-blue-500">
                  {data?.bookname}
                </td>
                <td className="p-3 text-center border-[1px] border-r-blue-500">
                  {data?.authorname}
                </td>
                <td className="p-3 text-center border-[1px] border-r-blue-500">
                  {data?.from_date}
                </td>
                <td className="p-3 text-center border-[1px] border-r-blue-500">
                  {data?.to_date}
                </td>
                <td className="p-3 text-center border-[1px] border-r-blue-500">
                  <button
                    onClick={() => handleRequest("accept", data)}
                    className="w-[100px] py-1 px-3 font-semibold bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 transition"
                  >
                    ACCEPT
                  </button>
                </td>
                <td className="p-3 text-center border-[1px] border-r-blue-500">
                  <button className="w-[100px] py-1 px-3 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700 transition">
                    DECLINE
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RequestsBoard;
