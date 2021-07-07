import { useState } from "react";
import { OrderResponse } from "../../../interfaces/Order.interface";
import FindOrderForm from "../../forms/FindOrderForm";
import OrderInfo from "./OrderInfo";

const OrderView = () => {
  const [order, setOrder] = useState<OrderResponse | null>(null);
  const [orderState, setOrderState] = useState<"not found" | "found" | null>(
    null
  );
  return (
    <div className="flex flex-col items-center">
      <FindOrderForm setOrder={setOrder} setOrderState={setOrderState} />
      {orderState === "not found" && (
        <div className="mt-10 text-xl font-semibold">
          There is no order associated with the information you provided. Please
          try again.
        </div>
      )}
      {orderState === "found" && <OrderInfo order={order!} />}
    </div>
  );
};

export default OrderView;
