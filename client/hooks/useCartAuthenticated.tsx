import axios from "axios";
import { useCallback, useEffect } from "react";
import { API_URL, CART_ROUTE } from "../constants/api";
import CartContainer from "../containers/cart/CartContainer";
import UserContainer from "../containers/user/UserContainer";
import { CartResponse } from "../interfaces/Product.interface";

const useCartAuthenticated = () => {
  const { isInitialized, isLoggedIn, token, user } =
    UserContainer.useContainer();
  const { clearCart, fetchCart } = CartContainer.useContainer();

  useEffect(() => {
    console.log(isInitialized);
    if (isInitialized && isLoggedIn && token) {
      clearCart();
      fetchCart(user!._id, token);
    }
    if (isInitialized && !isLoggedIn) {
      clearCart();
    }
  }, [isLoggedIn]);
};

export default useCartAuthenticated;
