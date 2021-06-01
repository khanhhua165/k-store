import axios from "axios";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { getLayoutWithSideMenu } from "../../components/layout/WithSideMenu";
import ItemCard from "../../components/ui/product/ItemCard";
import ItemCards from "../../components/ui/product/ItemCards";
import { API_URL, PRODUCT_ROUTE } from "../../constants/api";
import { Product } from "../../interfaces/Product.interface";

export const getStaticProps = async () => {
  let data: Product[] = [];
  try {
    data = (
      await axios.get<{ products: Product[] }>(`${API_URL}${PRODUCT_ROUTE}`)
    ).data.products;
  } catch (e: unknown) {}
  return {
    props: { data },
    revalidate: 1,
  };
};

const Shop = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <ItemCards items={data} />;
};

Shop.getLayout = getLayoutWithSideMenu;

export default Shop;
