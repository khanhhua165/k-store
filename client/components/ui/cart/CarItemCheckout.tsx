import React from "react";
import { API_URL } from "../../../constants/api";
interface Props {
  image: string;
  name: string;
  quantity: number;
  totalPrice: number;
}
const CartItemCheckout: React.FC<Props> = ({
  image,
  name,
  quantity,
  totalPrice,
}) => {
  return (
    <div className="flex items-center justify-between space-x-3">
      <div className="flex items-center justify-start space-x-3">
        <div className="relative flex items-center justify-center flex-shrink-0 w-16 text-white border rounded-lg">
          <img
            src={`${API_URL}/${image}`}
            alt={name}
            className="object-contain w-16 h-16 rounded-lg"
          />
          <div className="absolute flex justify-center w-5 h-4 text-xs bg-pink-500 rounded-full -top-2 -right-2">
            {quantity < 10 ? quantity : "9+"}
          </div>
        </div>
        <div className="flex flex-wrap">{name}</div>
      </div>

      <div className="">${totalPrice}</div>
    </div>
  );
};

export default CartItemCheckout;
