import axios from "axios";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ImSpinner8 } from "react-icons/im";
import { API_URL, ORDER_ROUTE } from "../../constants/api";
import { OrderResponse } from "../../interfaces/Order.interface";

type Inputs = {
  email: string;
  code: string;
};

interface Props {
  setOrder: (order: OrderResponse | null) => void;
  setOrderState: (state: "not found" | "found" | null) => void;
}

const FindOrderForm: React.FC<Props> = ({ setOrder, setOrderState }) => {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ code, email }) => {
    try {
      const cartData = (
        await axios.post<{ order: OrderResponse }>(
          `${API_URL}${ORDER_ROUTE}/search-order`,
          { code, email }
        )
      ).data.order;
      setOrder(cartData);
      setOrderState("found");
    } catch (e: unknown) {
      setOrderState("not found");
      setOrder(null);
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
      <div className="flex flex-col sm:flex-row sm:space-x-2">
        <div className="flex flex-col sm:w-5/12">
          <span className="label-style">Email</span>
          <input
            type="text"
            placeholder="Email"
            className="input-style"
            {...register("email", {
              required: "You need to input an email",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "You need to input a valid email",
              },
            })}
          />
          {errors.email && (
            <p className="input-error">
              <span>{errors.email.message}</span>
            </p>
          )}
        </div>
        <div className="flex flex-col sm:w-7/12">
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
        </div>
      </div>

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
