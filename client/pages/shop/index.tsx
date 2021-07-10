import axios from "axios";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { getLayoutWithSideMenu } from "../../components/layout/WithSideMenu";
import ItemCards from "../../components/ui/product/ItemCards";
import Pagination from "../../components/ui/product/Pagination";
import { API_URL, PRODUCT_ROUTE } from "../../constants/api";
import { Product, ProductsResponse } from "../../interfaces/Product.interface";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const query = context.query;
  const page = query.page ? query.page : "1";
  let products: Product[] = [];
  let totalPage: number;
  try {
    const data = (
      await axios.get<ProductsResponse>(
        `${API_URL}${PRODUCT_ROUTE}?page=${page}`
      )
    ).data;
    products = data.products;
    totalPage = data.totalPage;
  } catch (e: unknown) {
    return { notFound: true };
  }
  return {
    props: { products, currentPage: +page, totalPage, currentURL: "/shop" },
  };
};

const Shop = ({
  products,
  currentPage,
  totalPage,
  currentURL,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>V-Mart | Shop</title>
        <meta
          name="description"
          content="The best place to get your animal nutrition"
        />
      </Head>
      <div className="flex flex-col items-center w-full">
        <ItemCards items={products} />
        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          currentURL={currentURL}
        />
      </div>
    </>
  );
};

Shop.getLayout = getLayoutWithSideMenu;

export default Shop;
