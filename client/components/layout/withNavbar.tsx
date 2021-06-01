import React from "react";
import Navbar from "../ui/menu/Navbar";

const WithNavbar: React.FC = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="mt-16"></div>
      <div className="mx-3">{children}</div>
    </>
  );
};

export default WithNavbar;
