import { AppProps } from "next/app";
import React from "react";
import "../styles/globals.css";
import Head from "next/head";
import UserContainer from "../containers/user/UserContainer";
import CartContainer from "../containers/cart/CartContainer";
import WithNavbar from "../components/layout/withNavbar";

function MyApp({ Component, pageProps }: any) {
  const getLayout =
    Component.getLayout || ((page: any) => <WithNavbar>{page}</WithNavbar>);
  return (
    <UserContainer.Provider>
      <CartContainer.Provider>
        <Head>
          <title>K-Store</title>
        </Head>
        {getLayout(<Component {...pageProps} />)}
      </CartContainer.Provider>
    </UserContainer.Provider>
  );
}

export default MyApp;
