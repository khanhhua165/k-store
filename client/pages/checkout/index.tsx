import Head from "next/head";
import CheckoutPage from "../../components/ui/checkout/CheckoutPage";

function Checkout() {
  return (
    <>
      <Head>
        <title>V-Mart | Checkout</title>
        <meta name="description" content="Checkout page" />
      </Head>
      <CheckoutPage />
    </>
  );
}

export default Checkout;
