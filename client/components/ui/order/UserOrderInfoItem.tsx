import Link from "next/link";
import React from "react";
import { isoDateToString } from "../../../helpers/isoDateToString";
import { UserOrderResponse } from "../../../interfaces/Order.interface";

interface Props {
  order: UserOrderResponse;
}

const UserOrderInfoItem: React.FC<Props> = ({ order }) => {
  return (
    <tr className="">
      <td className="px-3 py-3 break-all border-b border-gray-200">
        {order.orderId}
      </td>
      <td className="px-3 py-3 border-b border-gray-200">
        {isoDateToString(order.orderDate)}
      </td>
      <td className="hidden px-3 py-3 break-all border-b border-gray-200 xs:table-cell">
        ${order.orderTotal}
      </td>
      <td className="px-3 py-3 text-center border-b border-gray-200">
        <Link href={`/order/${order.orderId}`}>
          <a className="flex items-center justify-center px-2 py-1 text-white bg-blue-700 rounded-md hover:bg-blue-800 active:bg-blue-900">
            DETAIL
          </a>
        </Link>
      </td>
    </tr>
  );
};

export default UserOrderInfoItem;
