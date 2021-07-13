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
import NProgress from "nprogress";
import Router from "next/router";

const stripePromise = loadStripe(STRIPE_KEY);
NProgress.configure({ showSpinner: false });

Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`);
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

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
              <title>V-Mart</title>
              <meta
                name="description"
                content="The best place to get your animal nutrition"
              />
              <link rel="shortcut icon" href="/favicon.ico" />
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
