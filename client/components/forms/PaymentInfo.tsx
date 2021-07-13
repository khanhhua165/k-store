import { SubmitHandler, useForm } from "react-hook-form";
import CartContainer from "../../containers/cart/CartContainer";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { API_URL, ORDER_ROUTE, STRIPE_ROUTE } from "../../constants/api";
import React, { useState } from "react";
import { AiOutlineWarning } from "react-icons/ai";
import CheckoutContainer from "../../containers/checkout/CheckoutContainer";
import UserContainer from "../../containers/user/UserContainer";
import RecipientInfo from "../ui/checkout/RecipientInfo";
import RecipientInfoDisclosure from "../ui/checkout/RecipientInfoDisclosure";
import { OrderSuccessResponse } from "../../interfaces/Order.interface";
import { useRouter } from "next/router";
import { ImSpinner8 } from "react-icons/im";
import { toast } from "react-toastify";

type Inputs = {
  method: string;
};

interface Props {
  cb: (showInfo: boolean) => void;
}

const PaymentInfo: React.FC<Props> = ({ cb }) => {
  const [cardErr, setCardErr] = useState("");
  const { totalPrice, cartItem, totalItem } = CartContainer.useContainer();
  const { user } = UserContainer.useContainer();
  const { address, city, email, name, phone, state } =
    CheckoutContainer.useContainer();
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const {
    formState: { isSubmitting },
    handleSubmit,
    register,
    watch,
  } = useForm<Inputs>({ defaultValues: { method: "Cash" } });

  const paymentInfo = {
    cart: cartItem,
    address,
    name,
    state,
    city,
    email,
    phone,
    totalPrice,
    totalItem,
    ...(user?._id && { userId: user._id }),
  };
  const onSubmit: SubmitHandler<Inputs> = async ({ method }) => {
    if (method === "Cash") {
      try {
        const response = await axios.post<OrderSuccessResponse>(
          `${API_URL}${ORDER_ROUTE}/cod`,
          {
            ...paymentInfo,
          }
        );
        const { orderId } = response.data;
        router.push(`checkout/success/${orderId}`);
      } catch (e: unknown) {
        toast.warning("there was some unexpected error, please try again.");
      }
    }
    if (method === "Card") {
      if (stripe && elements) {
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: "card",
          card: elements.getElement(CardElement)!,
        });
        if (error) {
          setCardErr("Card information is invalid!");
          elements.getElement("card")!.focus();
        }
        if (!error && paymentMethod) {
          try {
            const { id } = paymentMethod;
            const response = await axios.post<OrderSuccessResponse>(
              `${API_URL}${STRIPE_ROUTE}`,
              {
                amount: totalPrice * 100,
                id: id,
                ...paymentInfo,
              }
            );
            const { orderId } = response.data;
            router.push(`checkout/success/${orderId}`);
          } catch (e) {
            toast.warning("there was some unexpected error, please try again.");
          }
        }
      }
    }
  };

  return (
    <form
      className="flex flex-col w-full max-w-md sm:text-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex pb-2 text-xl border-b-2 border-gray-700">
        Payment
      </div>
      <span className="mb-2 text-lg label-style">Payment Method</span>
      <div className="flex items-center mb-3 space-x-2">
        <input className="" type="radio" value="Cash" {...register("method")} />
        <span className="text-base">Cash On Delivery</span>
      </div>
      <div className="flex items-center mb-3 space-x-2">
        <input className="" type="radio" value="Card" {...register("method")} />
        <span className="text-base">Credit Card</span>
      </div>
      {watch("method") === "Card" && (
        <>
          <div className="input-style">
            <CardElement
              onChange={() => setCardErr("")}
              options={{
                hidePostalCode: true,
                style: {
                  base: {
                    iconColor: "#424770",
                    fontSize: "16px",
                    color: "#424770",
                    fontSmoothing: "antialiased",
                    ":-webkit-autofill": { color: "#fce883" },
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    iconColor: "#EF4444",
                    color: "#EF4444",
                  },
                },
                iconStyle: "solid",
              }}
            />
          </div>
          {cardErr && (
            <p className="input-error">
              <AiOutlineWarning />
              <span>{cardErr}</span>
            </p>
          )}
        </>
      )}
      <button
        disabled={!stripe || isSubmitting}
        type="submit"
        className="flex justify-center px-2 py-2 mt-3 bg-blue-600 border-2 border-gray-300 rounded-md cursor-pointer text-gray-50 hover:bg-blue-700 focus:bg-blue-800"
      >
        {isSubmitting ? (
          <span className="duration-300 animate-spin">
            <ImSpinner8 />
          </span>
        ) : watch("method") === "Card" ? (
          `Pay $${totalPrice}`
        ) : (
          "Order Now"
        )}
      </button>
      <div className="hidden xs:flex xs:flex-col">
        <div className="flex items-center pb-2 mt-2 space-x-2 text-xl border-b-2 border-gray-700">
          <span>Recipient</span>
          <span
            className="text-base cursor-pointer hover:text-red-500 active:text-red-600"
            onClick={() => cb(true)}
          >
            (Edit shipping inforamtion)
          </span>
        </div>
        <RecipientInfo />
      </div>
      <RecipientInfoDisclosure cb={cb} />
    </form>
  );
};

export default PaymentInfo;
