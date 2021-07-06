import axios from "axios";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { API_URL, USER_ROUTE } from "../../constants/api";
import { toast } from "react-toastify";
import { ImSpinner8 } from "react-icons/im";
import Link from "next/link";

interface Inputs {
  email: string;
}
const PasswordRecovery: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async ({ email }) => {
    try {
      await axios.post(`${API_URL}${USER_ROUTE}/password-recovery`, { email });
      toast.success("Email has been sent. Please check your inbox!");
    } catch (e) {
      if (e.response) {
        toast.error("There was some unexpected error, please try again!!");
      }
    }
  };

  return (
    <form
      className="flex flex-col w-3/4 max-w-md px-3 py-4 mx-auto mb-4 border border-gray-200 rounded-md shadow-md mt-28 sm:text-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-wrap">
        Tell us the email address associated with your account, and we’ll send
        you an email with a link to reset your password.
      </div>
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
          "Reset Password"
        )}
      </button>
      <div className="flex mt-2 space-x-2">
        <span className="text-gray-500">Back to</span>
        <Link href="/signin">
          <a className="font-semibold hover:text-red-500">Sign in</a>
        </Link>
      </div>
      <div className="flex mt-2 space-x-2">
        <span className="text-gray-500">New Customer?</span>
        <Link href="/signup">
          <a className="font-semibold hover:text-red-500">Sign up</a>
        </Link>
      </div>
    </form>
  );
};

export default PasswordRecovery;
