import React, { useEffect, useState } from "react";
import axios from "axios";

const data = [
  "S.NO",
  "User Id",
  "Book Id",
  "Book Name",
  "Author Name",
  "From (YYYY-MM-DD)",
  "Till (YYYY-MM-DD)",
  "Returned Status",
  "Change Status",
];

const RentedBorad = () => {
  const [rentalData, setRentalData] = useState([]);

  const getRentalsData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/books/rentals/all`
      );
      setRentalData(response?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRentalsData();
  }, []);

  const handleStatus = async (value) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/books/returned/update`,
        {
          _id: value?._id,
          userId: value?.userId,
          bookId: value?.bookId,
        }
      );
      console.log(response);
      setRentalData((prev) => {
        return prev?.map((val) => {
          if (val?._id === value?._id) {
            val.returned = true;
            return val;
          } else {
            return val;
          }
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-[95%] min-h-max max-h-[98%] overflow-x-auto overflow-y-auto scrollbar">
      <table className="w-[100%] border-collapse ">
        <thead>
          <tr className="sticky bg-blue-800 z-10 top-0 left-0 right-0 border-[1px] border-blue-300 text-white">
            {data?.map((data, idx) => {
              return (
                <th
                  key={idx}
                  className="p-3 border-[1px] border-r-blue-500 text-lg font-medium whitespace-nowrap text-center"
                >
                  {data}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {rentalData?.map((data, idx) => {
            return (
              <tr
                style={{ opacity: data?.returned ? "0.5" : "1" }}
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
                <td className="p-3 text-center font-semibold border-[1px] border-r-blue-500">
                  {data?.returned ? "Yes" : "No"}
                </td>
                <td className="p-3 text-center text-sm border-[1px] border-r-blue-500">
                  {!data?.returned && (
                    <button
                      onClick={() => handleStatus(data)}
                      className="w-[100%] px-3 py-1 font-semibold bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
                    >
                      Mark as Returned
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RentedBorad;
