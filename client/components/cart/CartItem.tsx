import React from "react";
import { API_URL } from "../../constants/api";
import CartContainer from "../../containers/cart/CartContainer";
import { ProductCartItem } from "../../interfaces/Product.interface";

interface Props {
  productInCart: ProductCartItem;
}
const CartItem: React.FC<Props> = ({ productInCart }) => {
  const { updateQuantity, removeProduct } = CartContainer.useContainer();
  const { product, quantity, totalPrice } = productInCart;
  const { _id, image, name, price, stock } = product;
  return (
    <div className="flex py-2 border-t">
      <div className="flex items-center justify-center w-24 border rounded-lg">
        <img
          src={`${API_URL}/${image}`}
          alt={name}
          className="object-contain w-20 h-20"
        />
      </div>
      <div className="w-48 pr-2 mx-3">{name}</div>
      <div className="mx-2 font-semibold w-28">${price}</div>
      <div className="w-32 mx-2 font-semibold">{quantity}</div>
      <div className="ml-2 font-semibold w-36">${totalPrice}</div>
    </div>
  );
};

export default CartItem;
