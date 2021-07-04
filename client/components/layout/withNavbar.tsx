import React from "react";
import Navbar from "../ui/menu/Navbar";

const WithNavbar: React.FC = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="mt-14"></div>
      <div className="">{children}</div>
    </>
  );
};

export default WithNavbar;
