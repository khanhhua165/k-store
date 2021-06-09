import { useEffect } from "react";
import CartContainer from "../containers/cart/CartContainer";
import UserContainer from "../containers/user/UserContainer";

const useCartAuthenticated = () => {
  const { isInitialized, isLoggedIn, token, user } =
    UserContainer.useContainer();
  const { clearCart, fetchCart } = CartContainer.useContainer();

  useEffect(() => {
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
