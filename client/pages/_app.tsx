import { AppProps } from "next/app";
import React from "react";
import Navbar from "../components/Navbar";
import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "../store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Navbar />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
