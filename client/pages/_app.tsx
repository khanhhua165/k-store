import { AppProps } from "next/app";
import React from "react";
import "../styles/globals.css";
import Head from "next/head";
import UserContainer from "../containers/user/UserContainer";
import CartContainer from "../containers/cart/CartContainer";
import WithNavbar from "../components/layout/withNavbar";

// interface CustomAppProps extends AppProps {
//   Component.Type: JSX.element;
// }

function MyApp({ Component, pageProps }: any) {
  const Layout = Component.Layout || WithNavbar;
  return (
    <UserContainer.Provider>
      <CartContainer.Provider>
        <Head>
          <title>K-Store</title>
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CartContainer.Provider>
    </UserContainer.Provider>
  );
}

export default MyApp;
