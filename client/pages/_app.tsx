import { AppProps } from "next/app";
import React from "react";
import Navbar from "../components/ui/Navbar";
import "../styles/globals.css";
import Head from "next/head";
import UserContext from "../contexts/user/UserContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserContext.Provider>
      <Head>
        <title>K-Store</title>
      </Head>
      <Navbar />
      <div className="mt-16"></div>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
