import axios from "axios";
import { useCallback, useState } from "react";
import { createContainer } from "unstated-next";
import { API_URL, CART_ROUTE } from "../../constants/api";
import {
  CartResponse,
  Product,
  ProductCartItem,
} from "../../interfaces/Product.interface";

const useCart = () => {
  const [cartItem, setCartItem] = useState<ProductCartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItem, setTotalItem] = useState(0);

  const addProduct = useCallback(
    (product: Product, quantity: number) => {
      const productExisted = cartItem.find(
        (cartProduct) => cartProduct.product._id === product._id
      );
      if (productExisted) {
        if (productExisted.quantity >= product.stock) return;
        const newCart = cartItem.map((cartProduct) => {
          if (cartProduct.product._id === product._id) {
            const newQuantity = cartProduct.quantity + quantity;
            const trueNewQuantity =
              newQuantity >= product.stock ? product.stock : newQuantity;
            const newPrice = product.price * trueNewQuantity;
            const quantityDifference = trueNewQuantity - cartProduct.quantity;
            setTotalItem((oldValue) => oldValue + quantityDifference);
            setTotalPrice(
              (oldValue) => oldValue + product.price * quantityDifference
            );
            return {
              product: cartProduct.product,
              quantity: trueNewQuantity,
              totalPrice: newPrice,
            };
          } else {
            return cartProduct;
          }
        });
        setCartItem(newCart);
      } else {
        const newCart = [
          ...cartItem,
          { product, quantity, totalPrice: product.price * quantity },
        ];
        setCartItem(newCart);
        setTotalItem((oldValue) => oldValue + quantity);
        setTotalPrice((oldValue) => oldValue + product.price * quantity);
      }
    },
    [cartItem, totalItem, totalPrice]
  );

  const updateQuantity = useCallback(
    (productId: string, newQuantity: number) => {
      if (newQuantity === 0) {
        const { quantity, totalPrice } = cartItem.find(
          (cartProduct) => cartProduct.product._id === productId
        )!;
        setTotalItem((oldValue) => oldValue - quantity);
        setTotalPrice((oldValue) => oldValue - totalPrice);
        const newCart = cartItem.filter(
          (cartProduct) => cartProduct.product._id !== productId
        );
        setCartItem(newCart);
        return;
      }
      const newCart = cartItem.map((product) => {
        if (product.product._id === productId) {
          const trueNewQuantity =
            newQuantity >= product.product.stock
              ? product.product.stock
              : newQuantity;
          const quantityDifference = trueNewQuantity - product.quantity;
          setTotalItem((oldValue) => oldValue + quantityDifference);
          setTotalPrice(
            (oldValue) => oldValue + quantityDifference * product.product.price
          );
          return {
            ...product,
            quantity: trueNewQuantity,
            totalPrice: trueNewQuantity * product.product.price,
          };
        } else {
          return product;
        }
      });
      setCartItem(newCart);
    },
    [cartItem]
  );

  const clearCart = useCallback(() => {
    setCartItem([]);
    setTotalItem(0);
    setTotalItem(0);
  }, []);

  const fetchCart = useCallback(async (userId: string, tokenString: string) => {
    console.log(tokenString);
    try {
      const data = (
        await axios.get<{ userCart: CartResponse }>(`${API_URL}${CART_ROUTE}`, {
          headers: { Authorization: `Bearer ${tokenString}` },
        })
      ).data.userCart;
      setCartItem(data.items);
      setTotalPrice(data.totalPrice);
      setTotalItem(data.totalItem);
    } catch (e) {
      if (e.response) {
        console.log(e.response.data.message);
      }
    }
  }, []);

  const saveCartToDatabase = useCallback(
    async (userId: string) => {
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
    },
    [cartItem, totalItem, totalPrice]
  );

  return {
    cartItem,
    totalItem,
    totalPrice,
    addProduct,
    updateQuantity,
    clearCart,
    fetchCart,
    saveCartToDatabase,
  };
};

const CartContainer = createContainer(useCart);

export default CartContainer;
