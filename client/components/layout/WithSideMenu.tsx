import React from "react";
import Menubar from "../ui/Menubar";
import WithNavbar from "./withNavbar";

const WithSideMenu: React.FC = ({ children }) => {
  return (
    <>
      <div className="hidden sm:flex space-x-14 mt-36">
        <Menubar />
        {children}
      </div>
      <div className="flex justify-center mt-36 sm:hidden">{children}</div>
    </>
  );
};

export const getLayoutWithSideMenu = (page: any) => (
  <WithNavbar>
    <WithSideMenu>{page}</WithSideMenu>
  </WithNavbar>
);
export default WithSideMenu;
