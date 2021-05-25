import React from "react";
import { ItemProps } from "../ui/ItemCard";
interface Props extends ItemProps {
  cb: () => void;
}
const ItemModal: React.FC<Props> = ({
  cb,
  description,
  image,
  name,
  price,
}) => {
  return (
    <>
      <div
        className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-gray-800 opacity-40"
        onClick={cb}
      ></div>
      <div className="fixed top-1/2 left-1/2 mt-[-285px] ml-[-385px] z-50 flex items-center justify-center w-[770px] h-[570px] bg-red-500">
        <div className="px-4 py-4 bg-blue-400" onClick={cb}>
          X
        </div>
      </div>
    </>
  );
};
export default ItemModal;
