import axios from "axios";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { getLayoutWithSideMenu } from "../../components/layout/WithSideMenu";
import ItemCard from "../../components/ui/ItemCard";
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
    revalidate: 10,
  };
};

const Shop = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log(data);
  const itemCards = data.map((product) => (
    <ItemCard
      key={product._id}
      description={product.description}
      _id={product._id}
      image={product.image}
      name={product.name}
      price={product.price}
    />
  ));
  return <div className="flex flex-wrap space-x-6">{itemCards}</div>;
};

Shop.getLayout = getLayoutWithSideMenu;

export default Shop;
