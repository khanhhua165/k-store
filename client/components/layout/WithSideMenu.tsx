import React from "react";
import Menubar from "../ui/Menubar";
import WithNavbar from "./withNavbar";

const WithSideMenu: React.FC = ({ children }) => {
  return (
    <WithNavbar>
      <div className="flex space-x-2 mt-36">
        <Menubar />
        {children}
      </div>
    </WithNavbar>
  );
};

export default WithSideMenu;
