import React from "react";
import { useState } from "react";
import { API_URL } from "../../../constants/api";
import { Product } from "../../../interfaces/Product.interface";
import ProductDescription from "./ProductDescription";
import ProductReview from "./ProductReview";
import Rating from "./Rating";

const ItemDetail: React.FC<{ product: Product }> = ({ product }) => {
  const [realNumReviews, setRealNumReviews] = useState(product.numReviews);
  const [realRating, setRealRating] = useState(product.rating);

  return (
    <div className="flex flex-col max-w-[70rem] space-y-6 mx-8">
      <div className="flex flex-wrap text-4xl font-semibold text-center xs:text-left">
        {product.name}
      </div>
      <div className="flex justify-center xs:justify-start">
        <Rating
          rating={realRating}
          numReviews={realNumReviews}
          inline={true}
          fontSize="text-xl"
        />
      </div>

      <div className="flex flex-col mt-2 space-y-4 sm:flex-row sm:items-start sm:space-x-6 sm:space-y-0">
        <div className="flex border border-gray-200 rounded-lg sm:w-5/12">
          <img
            src={`${API_URL}/${product.image}`}
            alt={product.name}
            className="rounded-lg"
          />
        </div>
        <ProductDescription product={product} />
      </div>
      <ProductReview
        setRealNum={setRealNumReviews}
        realNum={realNumReviews}
        setRealRating={setRealRating}
        reviews={product.reviews}
        productId={product._id}
      />
    </div>
  );
};

export default ItemDetail;
