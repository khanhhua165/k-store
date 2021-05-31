import React from "react";
import useAuth from "../../hooks/useAuth";
import useCartAuthenticated from "../../hooks/useCartAuthenticated";
const Initializer: React.FC = () => {
  useAuth();
  useCartAuthenticated();
  return null;
};

export default Initializer;
