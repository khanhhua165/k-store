import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ADMIN_ROUTE, API_URL } from "../../../constants/api";
import UserContainer from "../../../containers/user/UserContainer";
import { Summary } from "../../../interfaces/Admin.interface";
import { FaShoppingCart, FaUserCheck } from "react-icons/fa";
import { HiArchive } from "react-icons/hi";

const AdminSummary = () => {
  const { token, isLoggedIn } = UserContainer.useContainer();
  const [isFeteched, setIsFetched] = useState(false);
  const [orderCount, setOrderCount] = useState<number | null>(null);
  const [productCount, setProductCount] = useState<number | null>(null);
  const [userCount, setUserCount] = useState<number | null>(null);

  useEffect(() => {
    if (token && isLoggedIn) {
      (async () => {
        try {
          const response = (
            await axios.get<Summary>(`${API_URL}${ADMIN_ROUTE}/summary`, {
              headers: { Authorization: `Bearer ${token}` },
            })
          ).data;
          setOrderCount(response.orderCount);
          setProductCount(response.productCount);
          setUserCount(response.userCount);
        } catch (e: unknown) {
          toast.warning("Unable to fetch resource, please try again!");
        } finally {
          setIsFetched(true);
        }
      })();
    }
  }, [token, isLoggedIn]);

  return (
    <div className="flex flex-wrap items-center justify-center px-4 mt-28">
      <div className="w-[260px] flex flex-col px-4 py-3 space mt-3 border rounded shadow-md bg-gray-100 mx-4">
        <div className="mb-5 text-3xl text-blue-700">
          <FaShoppingCart />
        </div>
        <div className="text-xl font-semibold uppercase">
          {orderCount !== null ? orderCount : "N/A"}
        </div>
        <div className="text-xl text-gray-700">Orders Placed</div>
      </div>

      <div className="w-[260px] flex flex-col px-4 py-3 space border mt-3 rounded shadow-md bg-gray-100 mx-4">
        <div className="mb-5 text-3xl text-blue-700">
          <HiArchive />
        </div>
        <div className="text-xl font-semibold uppercase">
          {productCount !== null ? productCount : "N/A"}
        </div>
        <div className="text-xl text-gray-700">Total Products</div>
      </div>

      <div className="w-[260px] flex flex-col px-4 py-3 space border mt-3 rounded shadow-md bg-gray-100 mx-4">
        <div className="mb-5 text-3xl text-blue-700">
          <FaUserCheck />
        </div>
        <div className="text-xl font-semibold uppercase">
          {userCount !== null ? userCount : "N/A"}
        </div>
        <div className="text-xl text-gray-700">Users Registered</div>
      </div>
    </div>
  );
};

export default AdminSummary;
