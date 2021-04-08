import { AppProps } from "next/app";
import React from "react";
import { IntlProvider } from "react-intl";
import Navbar from "../components/Navbar";
import "../styles/globals.css";
import English from "../lang/en.json";
import { Provider } from "react-redux";
import store from "../store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <IntlProvider locale="en" messages={English}>
        <Navbar />
        <Component {...pageProps} />
      </IntlProvider>
    </Provider>
  );
}

export default MyApp;
