import React from "react";
import { API_URL } from "../../../constants/api";
import { Product } from "../../../interfaces/Product.interface";
import ProductDescription from "./ProductDescription";
import Rating from "./Rating";

const ItemDetail: React.FC<{ product: Product }> = ({ product }) => {
  const { image, name, numReviews, rating } = product;

  return (
    <div className="flex flex-col max-w-[70rem] mx-8">
      <div className="flex flex-wrap text-4xl font-semibold text-center xs:text-left">
        {name}
      </div>
      <div className="flex justify-center xs:justify-start">
        <Rating
          rating={rating}
          numReviews={numReviews}
          inline={true}
          fontSize="text-xl"
        />
      </div>

      <div className="flex flex-col mt-2 space-y-4 sm:flex-row sm:items-start sm:space-x-6 sm:space-y-0">
        <div className="flex border border-gray-200 rounded-lg sm:w-5/12">
          <img src={`${API_URL}/${image}`} alt={name} className="rounded-lg" />
        </div>
        <ProductDescription product={product} />
      </div>
    </div>
  );
};

export default ItemDetail;
