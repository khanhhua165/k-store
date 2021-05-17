import { AppProps } from "next/app";
import React from "react";
import Navbar from "../components/ui/Navbar";
import "../styles/globals.css";
import Head from "next/head";
import UserContainer from "../containers/user/UserContainer";
import CartContainer from "../containers/cart/CartContainer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserContainer.Provider>
      <CartContainer.Provider>
        <Head>
          <title>K-Store</title>
        </Head>
        <Navbar />
        <div className="mt-16"></div>
        <div className="mx-3">
          <Component {...pageProps} />
        </div>
      </CartContainer.Provider>
    </UserContainer.Provider>
  );
}

export default MyApp;
