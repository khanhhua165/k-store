import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FindOrderForm from "../../forms/FindOrderForm";

const OrderSearchView = () => {
  const [orderId, setOrderId] = useState("");
  const [orderState, setOrderState] = useState<"not found" | "found" | null>(
    null
  );
  const router = useRouter();
  useEffect(() => {
    if (orderState === "found" && orderId) {
      router.push(`/order/${orderId}`);
    }
  }, [orderState, orderId]);

  return (
    <div className="flex flex-col items-center">
      <FindOrderForm setOrderId={setOrderId} setOrderState={setOrderState} />
      {orderState === "not found" && (
        <div className="mt-10 text-xl font-semibold">
          There is no order associated with the information you provided. Please
          try again.
        </div>
      )}
    </div>
  );
};

export default OrderSearchView;
