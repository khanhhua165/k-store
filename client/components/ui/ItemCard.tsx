import React from "react";

interface Props {
  image: string;
  name: string;
  price: number;
  productId: number;
}

const ItemCard: React.FC<Props> = ({ image, name, price, productId }) => {
  return <div className=""></div>;
};

export default ItemCard;
