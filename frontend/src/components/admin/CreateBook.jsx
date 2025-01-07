import React, { useState } from "react";
import createImg from "../../assets/Create-amico.svg";
import axios from "axios";

const inputClassName =
  "bg-gray-800 px-4 py-3 w-[400px] sm:w-[90%] mb-5 text-white rounded-lg outline-none border border-gray-600 focus:ring-2 focus:ring-blue-500";

const CreateBook = () => {
  const [message, setMessage] = useState("");
  const [newBook, setNewBook] = useState({
    bookname: undefined,
    authorname: undefined,
    rating: undefined,
    type: undefined,
    bookImage: undefined,
    price: undefined,
  });

  const handleChange = (type, value) => {
    setNewBook((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/books/create`,
        newBook
      );
      setMessage(response?.data?.message);
      setTimeout(() => {
        setMessage("");
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-[85%] sm:w-[100%] h-[100%] pb-10 flex justify-between items-center">
      {message && (
        <p className="absolute top-24 rounded-md shadow-lg left-[28%] bg-green-600 text-white px-4 py-2">
          {message}
        </p>
      )}
      <form
        id="create-form"
        onSubmit={handleSubmit}
        className="flex flex-col justify-evenly items-start sm:items-center sm:w-[100%] sm:px-8 sm:mt-5"
      >
        <input
          onChange={(e) => handleChange("bookname", e.target.value)}
          className={inputClassName}
          type="text"
          placeholder="Book name"
          required
          value={newBook?.bookname}
        ></input>
        <input
          onChange={(e) => handleChange("authorname", e.target.value)}
          className={inputClassName}
          type="text"
          placeholder="Author name"
          required
          value={newBook?.authorname}
        ></input>
        <input
          onChange={(e) => handleChange("rating", e.target.value)}
          className={inputClassName}
          type="number"
          placeholder="Rating(0-5)"
          required
          value={newBook?.rating}
          min={1}
          max={5}
        ></input>
        <input
          onChange={(e) => handleChange("type", e.target.value)}
          className={inputClassName}
          type="text"
          placeholder="Genre"
          required
          value={newBook?.type}
        ></input>
        <input
          onChange={(e) => handleChange("bookImage", e.target.value)}
          className={inputClassName}
          type="text"
          placeholder="Image Link"
          required
          value={newBook?.bookImage}
        ></input>
        <input
          onChange={(e) => handleChange("price", e.target.value)}
          className={inputClassName}
          type="number"
          placeholder="Amount"
          required
          value={newBook?.price}
        ></input>
        <button
          value="submit"
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 px-4 py-3 w-[400px] sm:w-[90%] mb-3 text-white font-semibold rounded-lg shadow-md"
        >
          Create Book
        </button>
      </form>
      <div className="hidden sm:block w-[500px] sm:w-[100%] sm:h-[300px] h-[500px]">
        <img className="w-[100%] h-[100%] object-contain" src={createImg}></img>
      </div>
    </div>
  );
};

export default CreateBook;
