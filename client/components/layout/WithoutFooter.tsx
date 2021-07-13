import AdminSidebar from "../ui/menu/AdminSidebar";
import Navbar from "../ui/menu/Navbar";

const WithoutFooter: React.FC = ({ children }) => {
  return (
    <>
      <Navbar />
      <AdminSidebar />
      <div className="ml-[230px]">
        <div className="mt-14"></div>
        <div className="min-h-screen">{children}</div>
      </div>
    </>
  );
};

export const getLayoutWithoutFooter = (page: any) => {
  return <WithoutFooter>{page}</WithoutFooter>;
};

export default WithoutFooter;
