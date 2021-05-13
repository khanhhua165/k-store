import { AppProps } from "next/app";
import React from "react";
import Navbar from "../components/ui/Navbar";
import "../styles/globals.css";
import Head from "next/head";
import UserContainer from "../containers/user/UserContainer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserContainer.Provider>
      <Head>
        <title>K-Store</title>
      </Head>
      <Navbar />
      <div className="mt-16"></div>
      <Component {...pageProps} />
    </UserContainer.Provider>
  );
}

export default MyApp;
