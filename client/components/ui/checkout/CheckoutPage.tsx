import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiCheck } from "react-icons/fi";
import CartContainer from "../../../containers/cart/CartContainer";
import PaymentInfo from "../../forms/PaymentInfo";
import ShippingInfo from "../../forms/ShippingInfo";
import CardCheckoutDisclosure from "../cart/CardCheckoutDisclosure";
import CartCheckout from "../cart/CartCheckout";
const CheckoutPage = () => {
  const { totalItem } = CartContainer.useContainer();
  const [isInInfo, setIsInInfo] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if (totalItem === 0) router.push("/");
  }, [totalItem]);

  if (totalItem === 0) {
    return null;
  }

  return (
    <div className="flex flex-col w-11/12 mx-auto mt-24 mb-4">
      <div className="flex items-end justify-between w-64 mx-auto mb-3 space-x-3 xs:w-96">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-6 h-6 text-white bg-blue-800 rounded-full">
            {isInInfo ? 1 : <FiCheck />}
          </div>
          <span>Shipping Information</span>
        </div>
        <div className="flex-grow h-3 border-t-2 border-gray-800"></div>
        <div className="flex flex-col items-center">
          <div
            className={`flex items-center justify-center w-6 h-6 text-white ${
              isInInfo ? "bg-gray-400" : "bg-blue-800"
            } rounded-full`}
          >
            2
          </div>
          <span>Payment</span>
        </div>
      </div>

      <div className="flex flex-col justify-center xs:flex-row xs:space-x-12">
        {isInInfo ? (
          <ShippingInfo cb={setIsInInfo} />
        ) : (
          <PaymentInfo cb={setIsInInfo} />
        )}
        <div className="hidden xs:block">
          <CartCheckout />
        </div>
        <CardCheckoutDisclosure />
      </div>
    </div>
  );
};

export default CheckoutPage;
