import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import CartContainer from "../../../containers/cart/CartContainer";
import { Product } from "../../../interfaces/Product.interface";

const ProductDescription: React.FC<{ product: Product }> = ({ product }) => {
  const { addProduct } = CartContainer.useContainer();
  const [quantity, setQuantity] = useState(1);
  const { stock, description, price, size } = product;
  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(stock);
    const newValue = +e.target.value;
    if (newValue === 0) setQuantity(1);
    if (newValue > stock) {
      setQuantity(stock);
    } else {
      setQuantity(newValue);
    }
  };

  const handleSubtract = () => {
    if (quantity > 1) {
      setQuantity((oldQuantity) => oldQuantity - 1);
    }
  };

  const handleAddition = () => {
    if (quantity < stock) {
      setQuantity((oldQuantity) => oldQuantity + 1);
    }
  };

  const handleClick = () => {
    const roundedQuantity = Math.floor(quantity);
    addProduct(product, roundedQuantity);
  };
  return (
    <div className="flex flex-col py-3 bg-white border border-gray-200 rounded-lg">
      <span className="pb-3 mx-4 text-lg font-semibold uppercase border-b border-gray-200">
        Product Description
      </span>
      <div className="pt-3 mx-4">{description}</div>
      <div className="flex mx-4 mt-3 space-x-3">
        <div className="px-3 py-1 font-semibold text-white bg-blue-600 rounded-md">
          {size}
        </div>
        <div className="px-3 py-1 font-semibold text-white bg-blue-600 rounded-md">
          {stock} {stock > 1 ? "Products" : "Product"} In Stock
        </div>
      </div>
      <div className="flex justify-between mx-4 mt-4">
        <div className="flex items-center space-x-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="flex"
          >
            <div
              className="flex items-center justify-center h-8 border border-gray-900 cursor-pointer w-7 rounded-l-xl hover:bg-blue-300 active:bg-blue-400"
              onClick={handleSubtract}
            >
              <AiOutlineMinus className="text-xl" />
            </div>
            <input
              type="number"
              min="1"
              step="1"
              value={quantity}
              pattern="/d+"
              onChange={(e) => handleChangeQuantity(e)}
              className="w-12 h-8 text-lg font-bold text-center border-l-0 border-r-0"
            />
            <div
              className="flex items-center justify-center h-8 border border-gray-900 cursor-pointer w-7 rounded-r-xl hover:bg-blue-300 active:bg-blue-400"
              onClick={handleAddition}
            >
              <AiOutlinePlus className="text-xl" />
            </div>
          </form>
          <div className="text-lg font-semibold">${price}</div>
        </div>
        <div
          className="self-center px-6 py-2 font-semibold transition duration-300 border-2 border-blue-500 cursor-pointer rounded-xl hover:bg-red-500 hover:text-gray-50 hover:border-transparent"
          onClick={handleClick}
        >
          Add to Cart
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
