import axios from "axios";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { getLayoutWithSideMenu } from "../../../components/layout/WithSideMenu";
import ItemCards from "../../../components/ui/product/ItemCards";
import Pagination from "../../../components/ui/product/Pagination";
import { API_URL, PRODUCT_ROUTE } from "../../../constants/api";
import {
  Product,
  ProductsResponse,
} from "../../../interfaces/Product.interface";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const searchString = context.params!.searchString;
  const query = context.query;
  const page = query.page ? query.page : "1";
  let products: Product[] = [];
  let totalPage: number;
  try {
    const data = (
      await axios.get<ProductsResponse>(
        `${API_URL}${PRODUCT_ROUTE}?search=${searchString}&page=${page}`
      )
    ).data;
    products = data.products;
    totalPage = data.totalPage;
  } catch (e: unknown) {
    return {
      props: {
        products,
        currentPage: +page,
        totalPage: 0,
        currentURL: `/shop/search/${searchString}`,
      },
    };
  }
  return {
    props: {
      products,
      currentPage: +page,
      totalPage,
      searchString,
      currentURL: `/shop/search/${searchString}`,
    },
  };
};

const ShopSearchProduct = ({
  products,
  currentPage,
  totalPage,
  currentURL,
  searchString,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>V-Mart | Search for {searchString}</title>
        <meta
          name="description"
          content="The best place to get your animal nutrition"
        />
      </Head>
      <div className="flex flex-col items-center w-full">
        <ItemCards items={products} />
        {totalPage === 0 && (
          <div className="text-3xl">
            There's no product that match your search!
          </div>
        )}
        {totalPage > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPage={totalPage}
            currentURL={currentURL}
          />
        )}
      </div>
    </>
  );
};

ShopSearchProduct.getLayout = getLayoutWithSideMenu;

export default ShopSearchProduct;
