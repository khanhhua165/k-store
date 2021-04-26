import { AppProps } from "next/app";
import React from "react";
import Navbar from "../components/Navbar";
import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "../store";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>K-Store</title>
      </Head>
      <Navbar />
      <div className="mt-16"></div>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
