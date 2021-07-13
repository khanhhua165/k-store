import axios from "axios";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ImSpinner8 } from "react-icons/im";
import { API_URL, ORDER_ROUTE } from "../../constants/api";
import { OrderResponse } from "../../interfaces/Order.interface";

type Inputs = {
  code: string;
};

interface Props {
  setOrderId: (orderId: string) => void;
  setOrderState: (state: "not found" | "found" | null) => void;
}

const FindOrderForm: React.FC<Props> = ({ setOrderId, setOrderState }) => {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ code }) => {
    try {
      const orderData = (
        await axios.get<{ order: OrderResponse }>(
          `${API_URL}${ORDER_ROUTE}/${code}`
        )
      ).data.order;
      setOrderId(orderData._id);
      setOrderState("found");
    } catch (e: unknown) {
      setOrderState("not found");
      setOrderId("");
    }
  };

  return (
    <form
      className="flex flex-col w-11/12 max-w-md px-3 py-4 mt-12 border border-gray-200 rounded-md shadow-md sm:text-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-wrap mb-3">
        Please fill the form below with the order code you received when
        successfully placed an order.
      </div>
      <span className="label-style">Order Code</span>
      <input
        className="input-style"
        type="text"
        placeholder="Your Order Code"
        {...register("code", {
          required: "You need to input an order code",
        })}
      />
      {errors.code && (
        <p className="input-error">
          <span>{errors.code.message}</span>
        </p>
      )}

      <button
        disabled={isSubmitting}
        type="submit"
        className="flex justify-center py-2 mt-3 bg-blue-600 border-2 border-gray-300 rounded-md cursor-pointer text-gray-50 hover:bg-blue-700 focus:bg-blue-800"
      >
        {isSubmitting ? (
          <span className="duration-300 animate-spin">
            <ImSpinner8 />
          </span>
        ) : (
          "Search Order"
        )}
      </button>
    </form>
  );
};

export default FindOrderForm;
