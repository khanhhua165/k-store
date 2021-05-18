import axios from "axios";
import { useCallback, useEffect } from "react";
import { API_URL, CART_ROUTE } from "../../constants/api";
import CartContainer from "../../containers/cart/CartContainer";
import UserContainer from "../../containers/user/UserContainer";
import { CartResponse } from "../../interfaces/Product.interface";

const useCartAuthenticated = () => {
  const { isInitialized, isLoggedIn, token, user } =
    UserContainer.useContainer();
  const {
    addProduct,
    clearCart,
    removeProduct,
    setCartItem,
    setTotalPrice,
    updateQuantity,
    setTotalItem,
  } = CartContainer.useContainer();

  const fetchCart = useCallback(async (userId: string) => {
    try {
      const { totalPrice, items, totalItems } = (
        await axios.get<CartResponse>(`${API_URL}${CART_ROUTE}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      ).data;
      setCartItem(items);
      setTotalPrice(totalPrice);
      setTotalItem(totalItems);
    } catch (e) {
      if (e.response) {
        console.log(e.response.data.message);
      }
    }
  }, []);

  useEffect(() => {
    const fetchCart = async (userId: string) => {};
    if (isInitialized && isLoggedIn) {
      fetchCart(user!._id);
    }
  }, [isInitialized]);
};
