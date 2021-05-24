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
  return <div className="grid self-start grid-cols-4 gap-6">{itemCards}</div>;
};

export default ItemCards;
