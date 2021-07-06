import React from "react";
import "../styles/globals.css";
import Head from "next/head";
import UserContainer from "../containers/user/UserContainer";
import CartContainer from "../containers/cart/CartContainer";
import WithNavbar from "../components/layout/withNavbar";
import Initializer from "../components/initializers/Initializer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckoutContainer from "../containers/checkout/CheckoutContainer";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_KEY } from "../constants/stripeKey";

const stripePromise = loadStripe(STRIPE_KEY);

function MyApp({ Component, pageProps }: any) {
  const getLayout =
    Component.getLayout || ((page: any) => <WithNavbar>{page}</WithNavbar>);
  return (
    <>
      <ToastContainer />
      <UserContainer.Provider>
        <CartContainer.Provider>
          <CheckoutContainer.Provider>
            <Head>
              <title>K-Store</title>
            </Head>
            <Elements stripe={stripePromise}>
              <Initializer />
              {getLayout(<Component {...pageProps} />)}
            </Elements>
          </CheckoutContainer.Provider>
        </CartContainer.Provider>
      </UserContainer.Provider>
    </>
  );
}

export default MyApp;
