import Link from "next/link";
import React, { useState } from "react";
import { Product } from "../../../interfaces/Product.interface";
import { RiFileEditFill } from "react-icons/ri";
import { BsFillTrashFill } from "react-icons/bs";
import { ImSpinner8 } from "react-icons/im";
import axios from "axios";
import { API_URL, PRODUCT_ROUTE } from "../../../constants/api";
import { toast } from "react-toastify";

interface Props {
  product: Product;
  token: string;
  setHasFetched: (a: boolean) => void;
}

const ProductListItem: React.FC<Props> = ({
  product,
  token,
  setHasFetched,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await axios.delete(`${API_URL}${PRODUCT_ROUTE}/${product._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsDeleting(false);
      setHasFetched(false);
    } catch (e: unknown) {
      setIsDeleting(false);
      toast.error("Operation was unsuccessful, please try again!");
    }
  };

  return (
    <tr className="">
      <td className="px-3 py-3 break-all border-b border-gray-200">
        {product._id}
      </td>
      <td className="px-3 py-3 break-all border-b border-gray-200">
        {product.name}
      </td>
      <td className="px-3 py-3 break-all border-b border-gray-200">
        ${product.price}
      </td>
      <td className="px-3 py-3 break-all border-b border-gray-200">
        {product.productType}
      </td>
      <td className="px-3 py-3 text-center border-b border-gray-200">
        <div className="flex items-center justify-center space-x-1">
          <Link href={`/admin/product/${product._id}`}>
            <a className="px-1 py-1 text-lg text-white bg-blue-600 rounded">
              <RiFileEditFill />
            </a>
          </Link>
          {isDeleting ? (
            <span className="text-xl duration-300 animate-spin">
              <ImSpinner8 />
            </span>
          ) : (
            <button
              className="px-1 py-1 text-lg text-white bg-red-600 rounded"
              onClick={handleDelete}
            >
              <BsFillTrashFill />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

export default ProductListItem;
