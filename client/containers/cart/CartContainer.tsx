import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { createContainer } from "unstated-next";
import useAuthenticated from "../../components/hooks/useAuthenticated";
import { API_URL, CART_ROUTE } from "../../constants/api";
import { Product, ProductCartItem } from "../../interfaces/Product.interface";

const useCart = () => {
  const [cartItem, setCartItem] = useState<ProductCartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItem, setTotalItem] = useState(0);

  const setAllPrice = useCallback(() => {
    const totalPrice = cartItem.reduce(
      (total, product) => total + product.totalPrice,
      0
    );
    setTotalPrice(totalPrice);
  }, []);

  const addProduct = useCallback((product: Product, quantity: number) => {
    const productExisted = !!cartItem.find(
      (cartProduct) => cartProduct.product._id === product._id
    );
    if (productExisted) {
      const newCart = cartItem.map((cartProduct) => {
        if (cartProduct.product._id === product._id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
            totalPrice: cartProduct.totalPrice + product.price * quantity,
          };
        } else {
          return cartProduct;
        }
      });
      setCartItem(newCart);
    } else {
      setCartItem((oldCart) => [
        ...oldCart,
        { product, quantity, totalPrice: product.price * quantity },
      ]);
    }
    setTotalItem((oldItemValue) => oldItemValue + quantity);
    setAllPrice();
  }, []);

  const removeProduct = useCallback((productId: string) => {
    const newCart = cartItem.filter((product) => {
      return product.product._id !== productId;
    });
    setCartItem(newCart);
    setAllPrice();
  }, []);

  const updateQuantity = useCallback(
    (productId: string, newQuantity: number) => {
      const newCart = cartItem.map((product) => {
        if (product.product._id === productId) {
          return { ...product, quantity: newQuantity };
        } else {
          return product;
        }
      });
      setCartItem(newCart);
      setAllPrice();
    },
    []
  );

  const clearCart = useCallback(() => {
    setCartItem([]);
    setTotalItem(0);
    setTotalItem(0);
  }, []);

  return {
    cartItem,
    totalItem,
    totalPrice,
    addProduct,
    removeProduct,
    updateQuantity,
    clearCart,
    setCartItem,
    setTotalPrice,
    setTotalItem,
  };
};

const CartContainer = createContainer(useCart);

export default CartContainer;
