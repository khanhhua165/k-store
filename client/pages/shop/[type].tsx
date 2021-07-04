import axios from "axios";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getLayoutWithSideMenu } from "../../components/layout/WithSideMenu";
import ItemCards from "../../components/ui/product/ItemCards";
import { API_URL, PRODUCT_ROUTE } from "../../constants/api";
import { Product, ProductsResponse } from "../../interfaces/Product.interface";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  let data: Product[] = [];
  const { type } = context.params!;

  try {
    const response = await axios.get<ProductsResponse>(
      `${API_URL}${PRODUCT_ROUTE}/type/${type}`
    );
    data = response.data.products;
  } catch (e: unknown) {}
  return {
    props: { data },
  };
};

const ShopByType = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <ItemCards items={data} />;
};

ShopByType.getLayout = getLayoutWithSideMenu;

export default ShopByType;
