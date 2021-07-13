import axios from "axios";
import React, { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "react-toastify";
import { API_URL, PRODUCT_ROUTE } from "../../../constants/api";
import UserContainer from "../../../containers/user/UserContainer";
import {
  Product,
  ProductsResponse,
} from "../../../interfaces/Product.interface";
import ProductListItem from "./ProductListItem";
import ProductListPagination from "./ProductListPagination";

const ProductList = () => {
  const [hasFetched, setHasFetched] = useState(false);
  const [products, setProducts] = useState<Product[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState<number | null>(null);
  const { isLoggedIn, token } = UserContainer.useContainer();

  useEffect(() => {
    if (isLoggedIn && token && !hasFetched && currentPage > 0) {
      (async () => {
        try {
          const data = (
            await axios.get<ProductsResponse>(
              `${API_URL}${PRODUCT_ROUTE}?page=${currentPage}`
            )
          ).data;
          setProducts(data.products);
          setTotalPage(data.totalPage);
        } catch (e: unknown) {
          toast.warning("Unable to fetch resource, please try again!");
        } finally {
          setHasFetched(true);
        }
      })();
    }
  }, [isLoggedIn, token, currentPage, hasFetched]);

  if (!hasFetched) {
    return (
      <div className="flex flex-col items-center mx-4 mt-20 mb-8">
        <div className="text-4xl font-semibold">All Products</div>
        <div className="flex flex-col items-center text-6xl pt-14">
          <ImSpinner2 className="duration-500 animate-spin" />
        </div>
      </div>
    );
  }

  if (hasFetched && products === null) {
    return (
      <div className="flex flex-col items-center mx-4 mt-20 mb-8">
        <div className="text-4xl font-semibold">All Users</div>
        <div className="flex flex-col items-center text-3xl pt-14">N/A</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mx-4 mt-20 mb-8">
      <div className="mb-4 text-4xl font-semibold">All Products</div>
      <div className="inline-block bg-white rounded-lg shadow">
        <table className="text-sm border-collapse table-fixed sm:text-base borshadow-sm">
          <thead className="">
            <tr>
              <th className="px-3 py-3 text-left border-b border-gray-200 ">
                Prouct ID
              </th>
              <th className="px-3 py-3 text-left border-b border-gray-200 ">
                Name
              </th>
              <th className="px-3 py-3 text-left border-b border-gray-200">
                Price
              </th>
              <th className="px-3 py-3 text-left border-b border-gray-200">
                Type
              </th>
              <th className="px-3 py-3 text-left border-b border-gray-200 "></th>
            </tr>
          </thead>
          <tbody>
            {products!.map((prod) => (
              <ProductListItem
                product={prod}
                key={prod._id}
                token={token!}
                setHasFetched={setHasFetched}
              />
            ))}
          </tbody>
        </table>
      </div>
      <ProductListPagination
        currentPage={currentPage}
        totalPage={totalPage!}
        setCurrentPage={setCurrentPage}
        setHasFetched={setHasFetched}
      />
    </div>
  );
};

export default ProductList;
