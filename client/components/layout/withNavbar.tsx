import React from "react";
import Footer from "../ui/landing/Footer";
import Navbar from "../ui/menu/Navbar";

const WithNavbar: React.FC = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="mt-14"></div>
      <div className="min-h-screen">{children}</div>
      <Footer />
    </>
  );
};

export default WithNavbar;
