import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "react-toastify";
import { API_URL, USER_ROUTE } from "../../../constants/api";
import UserContainer from "../../../containers/user/UserContainer";
import { UserOrderResponse } from "../../../interfaces/Order.interface";
import UserOrderInfoItem from "./UserOrderInfoItem";

const UserOrderInfo = () => {
  const [orders, setOrders] = useState<UserOrderResponse[] | null>(null);
  const { isLoggedIn, token } = UserContainer.useContainer();
  const router = useRouter();
  useEffect(() => {
    if (isLoggedIn && token) {
      (async () => {
        try {
          const response = (
            await axios.get<{ orders: UserOrderResponse[] }>(
              `${API_URL}${USER_ROUTE}/orders`,
              { headers: { Authorization: `Bearer ${token}` } }
            )
          ).data;
          setOrders(response.orders);
        } catch (e: unknown) {
          toast.error(
            "There might be some problem with our server. Please access at a different time."
          );
          router.push("/");
        }
      })();
    }
  }, [isLoggedIn, token]);

  if (!orders) {
    return (
      <div className="flex flex-col items-center mt-20">
        <div className="text-4xl font-semibold">My Orders</div>
        <div className="flex flex-col items-center text-6xl pt-14">
          <ImSpinner2 className="duration-500 animate-spin" />
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center w-full px-4 pt-48 space-y-3 text-center">
        <div className="text-lg font-semibold">
          You haven't placed any order yet. Go shop now !
        </div>
        <Link href="/">
          <a className="px-2 py-2 text-lg font-semibold bg-blue-600 rounded hover:bg-blue-700 active:bg-blue-800 text-gray-50">
            V-Mart Home
          </a>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mx-4 mt-20 mb-8">
      <div className="mb-4 text-4xl font-semibold">My Orders</div>
      <div className="inline-block bg-white rounded-lg shadow">
        <table className="text-sm border-collapse table-fixed sm:text-base borshadow-sm">
          <thead className="">
            <tr>
              <th className="px-3 py-3 text-left border-b border-gray-200 ">
                Order ID
              </th>
              <th className="px-3 py-3 text-left border-b border-gray-200 ">
                Date
              </th>
              <th className="hidden px-3 py-3 text-left border-b border-gray-200 xs:table-cell">
                Total
              </th>
              <th className="px-3 py-3 text-left border-b border-gray-200 "></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <UserOrderInfoItem order={order} key={order.orderId} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserOrderInfo;
