import React from "react";
import { Product } from "../../interfaces/Product.interface";
import ItemCard from "./ItemCard";

const ItemCards: React.FC<{ items: Product[] }> = ({ items }) => {
  const itemCards = items.map((product) => (
    <ItemCard
      key={product._id}
      description={product.description}
      _id={product._id}
      image={product.image}
      name={product.name}
      price={product.price}
    />
  ));
  return (
    <div className="grid grid-cols-1 gap-6 justify-items-center xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {itemCards}
    </div>
  );
};

export default ItemCards;
