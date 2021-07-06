import axios from "axios";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import React from "react";
import { getLayoutWithSideMenu } from "../../components/layout/WithSideMenu";
import ItemCards from "../../components/ui/product/ItemCards";
import Pagination from "../../components/ui/product/Pagination";
import { API_URL, PRODUCT_ROUTE } from "../../constants/api";
import { Product, ProductsResponse } from "../../interfaces/Product.interface";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  let products: Product[] = [];
  let totalPage: number;
  const { type } = context.params!;
  const page = context.query.page ? context.query.page : "1";

  try {
    const data = (
      await axios.get<ProductsResponse>(
        `${API_URL}${PRODUCT_ROUTE}/type/${type}?page=${page}`
      )
    ).data;
    products = data.products;
    totalPage = data.totalPage;
  } catch (e: unknown) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      products,
      currentPage: +page,
      totalPage,
      currentURL: `/shop/${type}`,
    },
  };
};

const ShopByType = ({
  products,
  currentPage,
  currentURL,
  totalPage,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="flex flex-col items-center w-full">
      <ItemCards items={products} />
      <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        currentURL={currentURL}
      />
    </div>
  );
};

ShopByType.getLayout = getLayoutWithSideMenu;

export default ShopByType;
