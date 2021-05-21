import axios from "axios";
import { useCallback, useEffect } from "react";
import { API_URL, CART_ROUTE } from "../constants/api";
import CartContainer from "../containers/cart/CartContainer";
import UserContainer from "../containers/user/UserContainer";
import { CartResponse } from "../interfaces/Product.interface";

const useCartAuthenticated = () => {
  const { isInitialized, isLoggedIn, token, user } =
    UserContainer.useContainer();
  const {
    setCartItem,
    setTotalPrice,
    setTotalItem,
    cartItem,
    totalItem,
    totalPrice,
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

  const saveCartToDatabase = useCallback(async (userId: string) => {
    try {
      const response = await axios.post(`${API_URL}${CART_ROUTE}`, {
        userId,
        items: cartItem,
        totalPrice: totalPrice,
        totalItem: totalItem,
      });
      console.log(response);
    } catch (e) {
      if (e.response) console.log(e.response.data.message);
    }
  }, []);

  useEffect(() => {
    if (isInitialized && isLoggedIn) {
      fetchCart(user!._id);
    }
  }, [isInitialized]);
  return { fetchCart, saveCartToDatabase, totalItem };
};

export default useCartAuthenticated;
