import React, { useState, useEffect } from "react";
import ContentViewer from "../components/admin/ContentViewer";
import Header from "../components/admin/Header";
import SideBar from "../components/admin/SideBar";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";

const AdminPage = () => {
  const [dimension, setDimension] = useState();
  const [toggleVal, setToggleVal] = useState(false);

  useEffect(() => {
    setDimension(window.innerWidth);
  }, []);

  return (
    <>
      <Header />
      <div className="h-[100vh] flex bg-gradient-to-r from-indigo-900 to-blue-900">
        <div
          onClick={() => setToggleVal(!toggleVal)}
          className="absolute hidden sm:block top-16 right-0 bg-gradient-to-r from-teal-500 to-teal-700 text-white text-xl rounded-l-lg shadow-2xl font-light p-3 transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          {toggleVal ? <AiOutlineArrowRight /> : <AiOutlineArrowLeft />}
        </div>
        <SideBar dimension={dimension} status={toggleVal} />
        <ContentViewer />
      </div>
    </>
  );
};

export default AdminPage;
