import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import OrderInfo from "../../components/ui/order/OrderInfo";
import { API_URL, ORDER_ROUTE } from "../../constants/api";
import { OrderResponse } from "../../interfaces/Order.interface";

const Order = () => {
  const [order, setOrder] = useState<OrderResponse | null>(null);
  const router = useRouter();
  const orderCode = router.query.code;

  useEffect(() => {
    if (orderCode) {
      (async () => {
        try {
          const orderData = (
            await axios.post<{ order: OrderResponse }>(
              `${API_URL}${ORDER_ROUTE}/search-order`,
              { code: orderCode }
            )
          ).data.order;
          setOrder(orderData);
        } catch (e: unknown) {
          router.replace("/");
        }
      })();
    }
  }, [orderCode]);

  if (!order) {
    return (
      <div className="flex flex-col items-center text-6xl pt-36">
        <ImSpinner2 className="duration-500 animate-spin" />
      </div>
    );
  }
  return (
    <>
      <Head>
        <title>V-Mart | View your order</title>
      </Head>
      <div className="flex flex-col items-center">
        <OrderInfo order={order!} />
      </div>
    </>
  );
};

export default Order;
