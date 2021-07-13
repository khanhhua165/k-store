import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { ImCross, ImSpinner8 } from "react-icons/im";
import { toast } from "react-toastify";
import { API_URL, ORDER_ROUTE } from "../../../constants/api";
import { isoDateToString } from "../../../helpers/isoDateToString";
import { AdminOrder } from "../../../interfaces/Order.interface";

interface Props {
  order: AdminOrder;
  token: string;
}
const OrderListItem: React.FC<Props> = ({ order, token }) => {
  const [realIsPaid, setRealIsPaid] = useState(order.isPaid);
  const [realIsDelivered, setRealIsDelivered] = useState(order.isDelivered);
  const [isTogglingPaid, setIsTogglingPaid] = useState(false);
  const [isTogglingDelivered, setIsTogglingDelivered] = useState(false);

  const handlePaid = async () => {
    setIsTogglingPaid(true);
    try {
      await axios.patch(
        `${API_URL}${ORDER_ROUTE}`,
        { id: order._id, isPaid: true, isDelivered: realIsDelivered },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRealIsPaid(true);
      setIsTogglingPaid(false);
    } catch (e) {
      setIsTogglingPaid(false);
      toast.error("There was an unexpected error. Please try again!");
    }
  };

  const handleDelivered = async () => {
    setIsTogglingDelivered(true);
    try {
      await axios.patch(
        `${API_URL}${ORDER_ROUTE}`,
        { id: order._id, isPaid: realIsPaid, isDelivered: true },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRealIsDelivered(true);
      setIsTogglingDelivered(false);
    } catch (e) {
      setIsTogglingDelivered(false);
      toast.error("There was an unexpected error. Please try again!");
    }
  };

  return (
    <tr className="">
      <td className="px-3 py-3 break-all border-b border-gray-200">
        {order._id}
      </td>
      <td className="px-3 py-3 break-all border-b border-gray-200">
        {isoDateToString(order.createdAt)}
      </td>
      <td className="px-3 py-3 break-all border-b border-gray-200">
        {order.totalPrice}
      </td>
      <td className="px-3 py-3 break-all border-b border-gray-200">
        <div className="flex flex-col items-center justify-start space-y-1">
          <div className="text-xl">
            {realIsPaid ? (
              <FaCheck className="text-green-700" />
            ) : (
              <ImCross className="text-red-600" />
            )}
          </div>
          {isTogglingPaid ? (
            <span className="duration-300 animate-spin">
              <ImSpinner8 />
            </span>
          ) : (
            <span
              className={`text-blue-600 cursor-pointer hover:underline ${
                realIsPaid ? "hidden" : ""
              }`}
              onClick={handlePaid}
            >
              Mark as Paid
            </span>
          )}
        </div>
      </td>
      <td className="px-3 py-3 break-all border-b border-gray-200">
        <div className="flex flex-col items-center justify-start h-full space-y-1">
          <div className="text-xl">
            {realIsDelivered ? (
              <FaCheck className="text-green-700" />
            ) : (
              <ImCross className="text-red-600" />
            )}
          </div>
          {isTogglingDelivered ? (
            <span className="duration-300 animate-spin">
              <ImSpinner8 />
            </span>
          ) : (
            <span
              className={`text-blue-600 cursor-pointer hover:underline ${
                realIsDelivered || !realIsPaid ? "hidden" : ""
              }`}
              onClick={handleDelivered}
            >
              Mark as Delivered
            </span>
          )}
        </div>
      </td>
      <td className="px-3 py-3 text-center border-b border-gray-200">
        <Link href={`/order/${order._id}`}>
          <a className="px-1 py-1 text-white bg-blue-700 rounded hover:bg-blue-800 ">
            Detail
          </a>
        </Link>
      </td>
    </tr>
  );
};

export default OrderListItem;
