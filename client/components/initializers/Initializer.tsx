import React from "react";
import useAuth from "../../hooks/useAuth";
import useCartInitialized from "../../hooks/useCartInitialized";
import useCheckoutAuthenticated from "../../hooks/useCheckoutAuthenticated";
const Initializer: React.FC = () => {
  useAuth();
  useCartInitialized();
  useCheckoutAuthenticated();
  return null;
};

export default Initializer;
