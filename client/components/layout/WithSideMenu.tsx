import { useRouter } from "next/router";
import React from "react";
import { GiConsoleController } from "react-icons/gi";
import { getTitle } from "../../helpers/slugToTitle";
import Menubar from "../ui/menu/Menubar";
import WithNavbar from "./withNavbar";

const WithSideMenu: React.FC = ({ children }) => {
  const router = useRouter();
  const query = router.query;
  let title: string;
  console.log(query);
  if (Object.keys(query).length === 0) {
    title = "All Products";
  } else if (query.type) {
    title = getTitle(query.type as string);
  } else if (query.searchString) {
    title = `Search for ${query.searchString}`;
  } else {
    title = "All Products";
  }
  return (
    <div className="flex flex-col items-center mx-2 mt-28">
      <div className="flex-col hidden mx-auto sm:flex">
        <div className="text-5xl font-semibold">{title}</div>
        <div className="flex items-start mt-5 mb-4 space-x-9">
          <Menubar />
          {children}
        </div>
      </div>

      <div className="mt-5 mb-12 text-5xl font-semibold sm:hidden">{title}</div>
      <div className="flex justify-center mb-4 sm:hidden">{children}</div>
    </div>
  );
};

export const getLayoutWithSideMenu = (page: any) => (
  <WithNavbar>
    <WithSideMenu>{page}</WithSideMenu>
  </WithNavbar>
);
export default WithSideMenu;
