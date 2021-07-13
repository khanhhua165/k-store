import { OrderResponse } from "../../../interfaces/Order.interface";
import CartItemCheckout from "../cart/CarItemCheckout";
import clsx from "clsx";
import UserContainer from "../../../containers/user/UserContainer";
import React, { useState } from "react";
import axios from "axios";
import { API_URL, ORDER_ROUTE } from "../../../constants/api";
import { toast } from "react-toastify";
import { ImSpinner8 } from "react-icons/im";
import { isoDateToString } from "../../../helpers/isoDateToString";
import { getStateName } from "../../../helpers/getStateName";
interface Props {
  order: OrderResponse;
}

const OrderInfo: React.FC<Props> = ({ order }) => {
  const [realIsPaid, setRealIsPaid] = useState(order.isPaid);
  const [realIsDelivered, setRealIsDelivered] = useState(order.isDelivered);
  const [isTogglingPaid, setIsTogglingPaid] = useState(false);
  const [isTogglingDelivered, setIsTogglingDelivered] = useState(false);
  const { token, user } = UserContainer.useContainer();
  let isAdmin: boolean = false;
  if (user) {
    isAdmin = user.isAdmin;
  }
  const {
    address,
    cart,
    city,
    createdAt,
    name,
    phone,
    state,
    totalItem,
    totalPrice,
    email,
  } = order;
  const deliveryClasses = clsx({
    "text-yellow-500": !realIsDelivered,
    "text-green-500": realIsDelivered,
  });
  const paidClasses = clsx({
    "text-yellow-500": !realIsPaid,
    "text-green-500": realIsPaid,
  });
  const orderDate = isoDateToString(createdAt);

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

  const items = cart.map(({ product, quantity, totalPrice }) => (
    <CartItemCheckout
      image={product.image}
      name={product.name}
      productId={product._id}
      quantity={quantity}
      totalPrice={totalPrice}
      key={product._id}
    />
  ));

  return (
    <div className="flex w-11/12 max-w-4xl mx-auto mb-6 mt-9">
      <div className="flex flex-col items-start w-full mx-1 space-y-3 xs:flex-row xs:space-y-0">
        <div className="flex flex-col space-y-3 xs:w-7/12 xs:max-w-[25rem]">
          <div className="flex items-center justify-start pb-2 space-x-2 border-b-2 border-gray-700">
            <div className="text-lg font-semibold">Your Information</div>
          </div>
          <div className="mr-3">
            <span className="font-semibold">Order Date:</span> {orderDate}
          </div>
          <div className="mr-3">
            <span className="font-semibold">Recipient:</span> {name}
          </div>
          <div className="mr-3">
            <span className="font-semibold">Email:</span> {email}
          </div>
          <div className="mr-3">
            <span className="font-semibold">Shipping Address:</span>
            {` ${address}, ${city}, ${getStateName(state, "VN")}.`}
          </div>
          <div className="mr-3">
            <span className="font-semibold">Phone:</span> {phone}
          </div>
          <div className="mr-3">
            <span className="font-semibold">Payment Status:</span>
            <span className={paidClasses}>
              {realIsPaid ? " Paid" : " Not Yet Paid"}
            </span>
          </div>
          {!realIsPaid && user && isAdmin && (
            <button
              className="flex items-center self-start px-2 py-2 space-x-2 text-white bg-blue-700 rounded-md hover:bg-blue-800"
              onClick={handlePaid}
            >
              <span>Mark as Paid</span>
              {isTogglingPaid && (
                <ImSpinner8 className="duration-300 animate-spin" />
              )}
            </button>
          )}
          <div className="pr-3">
            <span className="font-semibold">Delivery Status:</span>
            <span className={deliveryClasses}>
              {realIsDelivered ? " Shipped" : " Delivering"}
            </span>
          </div>
          {!realIsDelivered && realIsPaid && user && isAdmin && (
            <button
              className="flex items-center self-start px-2 py-2 space-x-2 text-white bg-blue-700 rounded-md hover:bg-blue-800"
              onClick={handleDelivered}
            >
              <span>Mark as Delivered</span>
              {isTogglingDelivered && (
                <ImSpinner8 className="duration-300 animate-spin" />
              )}
            </button>
          )}
        </div>
        <div className="flex flex-col xs:w-5/12 w-full xs:max-w-[22rem] space-y-3">
          <div className="flex items-center justify-start pb-2 space-x-2 border-b-2 border-gray-700 xs:justify-end">
            <div className="text-lg font-semibold">Your Order</div>
          </div>
          {items}
          <div className="flex items-center justify-between pt-2 space-x-2 border-t-2 border-gray-700">
            <div className="text-lg">Total Item</div>
            <div className="text-lg">{totalItem}</div>
          </div>
          <div className="flex items-center justify-between space-x-2">
            <div className="text-lg">Total Price</div>
            <div className="text-lg">${totalPrice}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
