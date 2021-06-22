import React from "react";
import useAuth from "../../hooks/useAuth";
import useCartAuthenticated from "../../hooks/useCartAuthenticated";
import useCheckoutAuthenticated from "../../hooks/useCheckoutAuthenticated";
const Initializer: React.FC = () => {
  useAuth();
  useCartAuthenticated();
  useCheckoutAuthenticated();
  return null;
};

export default Initializer;
