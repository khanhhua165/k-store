import axios from "axios";
import { GetServerSideProps } from "next";
import Head from "next/head";
import ItemDetail from "../../components/ui/product/ItemDetail";
import { API_URL, PRODUCT_ROUTE } from "../../constants/api";
import { Product } from "../../interfaces/Product.interface";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params!.id;
  let data: Product;
  try {
    data = (
      await axios.get<{ product: Product }>(`${API_URL}${PRODUCT_ROUTE}/${id}`)
    ).data.product;
  } catch (e: unknown) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data },
  };
};

function ProductById({ data }: { data: Product }) {
  return (
    <>
      <Head>
        <title>V-Mart | {data.name}</title>
        <meta name="description" content={data.description} />
      </Head>
      <div className="flex justify-center mt-24 mb-6">
        <ItemDetail product={data} />
      </div>
    </>
  );
}

export default ProductById;
