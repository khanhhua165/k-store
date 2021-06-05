import React from "react";
import { API_URL } from "../../constants/api";
import CartContainer from "../../containers/cart/CartContainer";
import { ProductCartItem } from "../../interfaces/Product.interface";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
interface Props {
  productInCart: ProductCartItem;
}
const CartItem: React.FC<Props> = ({ productInCart }) => {
  const { updateQuantity } = CartContainer.useContainer();
  const { product, quantity, totalPrice } = productInCart;
  const { _id, image, name, price } = product;

  const handleIncrease = () => {
    updateQuantity(_id, quantity + 1);
  };

  const handleDecrease = () => {
    updateQuantity(_id, quantity - 1);
  };

  const handleDelete = () => {
    updateQuantity(_id, 0);
  };

  return (
    <div className="flex items-center py-2 border-t">
      <div className="flex items-center justify-center w-24 border rounded-lg">
        <img
          src={`${API_URL}/${image}`}
          alt={name}
          className="object-contain w-20 h-20"
        />
      </div>
      <div className="flex justify-center w-48 pr-2 mx-3 text-blue-700">
        {name}
      </div>
      <div className="flex justify-center mx-2 font-semibold w-28">
        ${price}
      </div>
      <div className="flex items-center justify-center mx-2 font-semibold w-36">
        <button className="p-1 border rounded-l-lg" onClick={handleDecrease}>
          <AiOutlineMinus />
        </button>
        <span className="px-2 border-t border-b">{quantity}</span>
        <button className="p-1 border rounded-r-lg" onClick={handleIncrease}>
          <AiOutlinePlus />
        </button>
      </div>

      <div className="flex justify-center mx-2 font-semibold w-28">
        ${totalPrice}
      </div>
      <button onClick={handleDelete}>
        <BsFillTrashFill />
      </button>
    </div>
  );
};

export default CartItem;
