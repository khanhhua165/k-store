import Link from "next/link";
import { BiBookContent } from "react-icons/bi";
import { MdAddToPhotos } from "react-icons/md";
import { BsFillArchiveFill } from "react-icons/bs";
import { RiShoppingCartFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";

const AdminSidebar = () => {
  return (
    <div className="fixed top-[55px] bottom-0 left-0 w-[230px] flex flex-col px-4 bg-indigo-700 shadow-md z-10 text-white overflow-y-auto font-semibold text-lg">
      <Link href="/admin">
        <a className="flex items-center pl-2 mt-6 space-x-2 text-xl italic rounded font-cursive">
          <span>
            <BiBookContent />
          </span>
          <span>Administrator</span>
        </a>
      </Link>
      <Link href="/admin/add-product">
        <a className="flex items-center w-full pl-2 mt-12 space-x-2 rounded hover:bg-gray-50 hover:text-black">
          <span>
            <MdAddToPhotos />
          </span>
          <span>Add Product</span>
        </a>
      </Link>
      <Link href="/admin/products">
        <a className="flex items-center w-full pl-2 mt-6 space-x-2 rounded hover:bg-gray-50 hover:text-black">
          <span>
            <BsFillArchiveFill />
          </span>
          <span>Products</span>
        </a>
      </Link>
      <Link href="/admin/orders">
        <a className="flex items-center w-full pl-2 mt-6 space-x-2 rounded hover:bg-gray-50 hover:text-black">
          <span>
            <RiShoppingCartFill />
          </span>
          <span>Orders</span>
        </a>
      </Link>
      <Link href="/admin/users">
        <a className="flex items-center w-full pl-2 mt-6 space-x-2 rounded hover:bg-gray-50 hover:text-black">
          <span>
            <FaUsers />
          </span>
          <span>Users</span>
        </a>
      </Link>
    </div>
  );
};

export default AdminSidebar;
