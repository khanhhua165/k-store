import Image from "next/image";
import React, { useState } from "react";
import { API_URL } from "../../../constants/api";
import { Product } from "../../../interfaces/Product.interface";
import ProductDescription from "./ProductDescription";
import Rating from "./Rating";

const ItemDetail: React.FC<{ product: Product }> = ({ product }) => {
  const { image, name, numReviews, rating } = product;

  return (
    <div className="flex flex-col max-w-[70rem]">
      <div className="flex flex-wrap text-4xl font-semibold">{name}</div>
      <Rating
        rating={rating}
        numReviews={numReviews}
        inline={true}
        fontSize="text-xl"
      />
      <div className="flex items-start mt-2 space-x-6">
        <div className="flex flex-shrink-0 border border-gray-200 rounded-lg">
          <Image
            src={`${API_URL}/${image}`}
            alt={name}
            height={500}
            width={500}
            objectFit="contain"
            className="rounded-lg"
          />
        </div>
        <ProductDescription product={product} />
      </div>
    </div>
  );
};

export default ItemDetail;
