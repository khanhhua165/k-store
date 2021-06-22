import { AppProps } from "next/app";
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
            <Initializer />
            {getLayout(<Component {...pageProps} />)}
          </CheckoutContainer.Provider>
        </CartContainer.Provider>
      </UserContainer.Provider>
    </>
  );
}

export default MyApp;
