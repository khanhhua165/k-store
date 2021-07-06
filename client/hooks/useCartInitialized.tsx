import { useEffect } from "react";
import CartContainer from "../containers/cart/CartContainer";
import UserContainer from "../containers/user/UserContainer";
import { ProductCartItem } from "../interfaces/Product.interface";

const useCartInitialized = () => {
  const { isInitialized } = UserContainer.useContainer();
  const {
    totalItem,
    saveCartToLocalStorage,
    setCartItem,
    setTotalItem,
    setTotalPrice,
  } = CartContainer.useContainer();

  useEffect(() => {
    if (isInitialized) {
      const storedCart = JSON.parse(
        localStorage.getItem("cartItem")!
      ) as ProductCartItem[];
      const storedTotalItem = +localStorage.getItem("totalItem")!;
      const storedTotalPrice = +localStorage.getItem("totalPrice")!;
      if (storedCart && storedTotalItem && storedTotalPrice) {
        setCartItem(storedCart);
        setTotalItem(storedTotalItem);
        setTotalPrice(storedTotalPrice);
      }
    }
  }, [isInitialized]);

  useEffect(() => {
    if (isInitialized) saveCartToLocalStorage();
  }, [totalItem]);
};

export default useCartInitialized;
