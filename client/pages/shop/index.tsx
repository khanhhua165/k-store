import axios from "axios";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getLayoutWithSideMenu } from "../../components/layout/WithSideMenu";
import ItemCards from "../../components/ui/product/ItemCards";
import { API_URL, PRODUCT_ROUTE } from "../../constants/api";
import { Product, ProductsResponse } from "../../interfaces/Product.interface";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const query = context.query;
  console.log(query);
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
  } catch (e: unknown) {}
  return {
    props: { products },
  };
};

const Shop = ({
  products,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <ItemCards items={products} />;
};

Shop.getLayout = getLayoutWithSideMenu;

export default Shop;
