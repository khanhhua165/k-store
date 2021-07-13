import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "react-toastify";
import { API_URL, ORDER_ROUTE } from "../../../constants/api";
import UserContainer from "../../../containers/user/UserContainer";
import { AdminOrder } from "../../../interfaces/Order.interface";
import OrderListItem from "./OrderListItem";

const OrderList = () => {
  const [orders, setOrders] = useState<AdminOrder[] | null>(null);
  const [hasFetched, setHasFetched] = useState(false);
  const { isLoggedIn, token } = UserContainer.useContainer();

  useEffect(() => {
    if (isLoggedIn && token && !hasFetched) {
      (async () => {
        try {
          const allOrders = (
            await axios.get<{ orders: AdminOrder[] }>(
              `${API_URL}${ORDER_ROUTE}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            )
          ).data.orders;
          setOrders(allOrders);
          setHasFetched(true);
        } catch (e: unknown) {
          toast.error("There was an unexpected error. Please try again");
          setHasFetched(true);
        }
      })();
    }
  }, [isLoggedIn, token, hasFetched]);

  if (!hasFetched) {
    return (
      <div className="flex flex-col items-center mx-4 mt-20 mb-8">
        <div className="text-4xl font-semibold">All Orders</div>
        <div className="flex flex-col items-center text-6xl pt-14">
          <ImSpinner2 className="duration-500 animate-spin" />
        </div>
      </div>
    );
  }

  if (hasFetched && orders === null) {
    return (
      <div className="flex flex-col items-center mx-4 mt-20 mb-8">
        <div className="text-4xl font-semibold">All Orders</div>
        <div className="flex flex-col items-center text-3xl pt-14">N/A</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mx-4 mt-20 mb-8">
      <div className="mb-4 text-4xl font-semibold">All Orders</div>
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
              <th className="px-3 py-3 text-left border-b border-gray-200">
                Total
              </th>
              <th className="px-3 py-3 text-center border-b border-gray-200">
                Paid
              </th>
              <th className="px-3 py-3 text-center border-b border-gray-200">
                Delivered
              </th>
              <th className="px-3 py-3 text-left border-b border-gray-200 "></th>
            </tr>
          </thead>
          <tbody>
            {orders!.map((ord) => (
              <OrderListItem order={ord} token={token!} key={ord._id} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
