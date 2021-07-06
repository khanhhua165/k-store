import React, { useState } from "react";
import { Product } from "../../../interfaces/Product.interface";
import SideMenuModal from "../../modal/SideMenuModal";
import ItemCard from "./ItemCard";
import { HiMenuAlt4 } from "react-icons/hi";

const ItemCards: React.FC<{ items: Product[] }> = ({ items }) => {
  const [showModal, setShowModal] = useState(false);
  const itemCards = items.map((product) => (
    <ItemCard key={product._id} product={product} />
  ));
  return (
    <>
      <SideMenuModal cb={() => setShowModal(false)} showModal={showModal} />
      <button
        className="fixed z-30 px-4 py-4 bg-blue-700 rounded-full shadow-md right-5 text-gray-50 sm:hidden hover:bg:blue-800 active:bg-blue-900 bottom-10"
        onClick={() => setShowModal(true)}
        title="Browse Products by Type"
      >
        <HiMenuAlt4 className="text-2xl" />
      </button>
      <div className="grid grid-cols-1 gap-6 justify-items-center xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {itemCards}
      </div>
    </>
  );
};

export default ItemCards;
