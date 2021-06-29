import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import CartContainer from "../../../containers/cart/CartContainer";
import CheckoutContainer from "../../../containers/checkout/CheckoutContainer";

function OrderSuccess() {
  const { clearCart } = CartContainer.useContainer();
  const { resetInfo } = CheckoutContainer.useContainer();
  useEffect(() => {
    clearCart();
    resetInfo();
  }, []);
  const router = useRouter();
  const { id } = router.query;
  return (
    <div className="flex flex-col items-center justify-center mt-40 space-y-2 text-lg xs:text-xl">
      <span className="text-5xl font-semibold text-blue-700">
        <FaCheckCircle />
      </span>
      <div className="">Thank you for purchasing our products!</div>
      <div className="">
        Your order code is:{" "}
        <span className="font-semibold text-blue-700">{id}</span>
      </div>
      <div className="">
        This code is also sent to your email address. Please keep this code for
        future reference.
      </div>
    </div>
  );
}

export default OrderSuccess;
