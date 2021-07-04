import React from "react";
import { API_URL } from "../../../constants/api";
import CartContainer from "../../../containers/cart/CartContainer";
import { ProductCartItem } from "../../../interfaces/Product.interface";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import Link from "next/link";
interface Props {
  productInCart: ProductCartItem;
  cb: () => void;
}
const CartItem: React.FC<Props> = ({ productInCart, cb }) => {
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

  const handleClickName = () => {
    cb();
  };

  return (
    <>
      <div className="flex flex-col items-center py-2 border-t xs:hidden">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center justify-center w-24 border rounded-lg">
            <img
              src={`${API_URL}/${image}`}
              alt={name}
              className="object-contain w-20 h-20"
            />
          </div>
          <div className="flex flex-col items-end w-40 space-y-2">
            <Link href={`/product/${_id}`}>
              <a
                className="flex pr-2 text-right text-blue-700 cursor-pointer justify-right"
                onClick={handleClickName}
              >
                {name}
              </a>
            </Link>

            <button onClick={handleDelete} className="pr-2">
              <BsFillTrashFill />
            </button>
          </div>
        </div>
        <div className="grid w-full grid-cols-3 gap-2 pr-2 my-2">
          <span className="justify-self-start">Price</span>
          <span className="justify-self-center">Quantity</span>
          <span className="justify-self-end">Total</span>
          <div className="justify-self start">${price}</div>
          <div className="flex items-center justify-center font-semibold w-36 justify-self-center">
            <button
              className="p-1 border rounded-l-lg"
              onClick={handleDecrease}
            >
              <AiOutlineMinus />
            </button>
            <span className="px-2 border-t border-b">{quantity}</span>
            <button
              className="p-1 border rounded-r-lg"
              onClick={handleIncrease}
            >
              <AiOutlinePlus />
            </button>
          </div>
          <div className="flex justify-center font-semibold justify-self-end">
            ${totalPrice}
          </div>
        </div>
      </div>

      <div className="items-center hidden py-2 border-t xs:flex">
        <div className="flex items-center justify-center w-24 border rounded-lg">
          <img
            src={`${API_URL}/${image}`}
            alt={name}
            className="object-contain w-20 h-20"
          />
        </div>
        <Link href={`/product/${_id}`}>
          <a
            className="flex justify-center w-48 pr-2 mx-3 text-blue-700 cursor-pointer"
            onClick={handleClickName}
          >
            {name}
          </a>
        </Link>

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
    </>
  );
};

export default CartItem;
