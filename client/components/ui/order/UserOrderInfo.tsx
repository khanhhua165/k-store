import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { API_URL, USER_ROUTE } from "../../../constants/api";
import UserContainer from "../../../containers/user/UserContainer";
import { UserOrderResponse } from "../../../interfaces/Order.interface";
import UserOrderInfoItem from "./UserOrderInfoItem";

const UserOrderInfo = () => {
  const [orders, setOrders] = useState<UserOrderResponse[] | null>(null);
  const { isLoggedIn, token } = UserContainer.useContainer();

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
          console.log(e);
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

  return (
    <div className="flex flex-col items-center mx-4 mt-20">
      <div className="mb-4 text-4xl font-semibold">My Orders</div>
      <div className="inline-block bg-white rounded-lg shadow">
        <table className="text-sm border-collapse table-fixed sm:text-base borshadow-sm">
          <thead className="">
            <tr>
              <th className="px-3 py-3 text-left border-b border-gray-200 ">
                OrderId
              </th>
              <th className="px-3 py-3 text-left border-b border-gray-200 ">
                Date
              </th>
              <th className="hidden px-3 py-3 text-left border-b border-gray-200 xs:block">
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
