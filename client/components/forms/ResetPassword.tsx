import axios from "axios";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { API_URL, USER_ROUTE } from "../../constants/api";
import { ImSpinner8 } from "react-icons/im";
import { toast } from "react-toastify";

type Inputs = {
  password: string;
  confirmPassword: string;
};
interface Props {
  code: string;
}
const ResetPassword: React.FC<Props> = ({ code }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ password }, e) => {
    try {
      await axios.post(`${API_URL}${USER_ROUTE}/password-recovery/reset`, {
        code,
        newPassword: password,
      });
      toast.success("Password reset successfully!");
      router.push("/signin");
    } catch (e: unknown) {
      toast.warning("Something went wrong, please try again.");
    }
  };
  return (
    <form
      className="flex flex-col w-11/12 max-w-md px-3 py-4 mx-auto mb-4 border border-gray-200 rounded-md shadow-md xs:w-3/4 mt-28 sm:text-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <span className="label-style">Password</span>
      <input
        className="input-style"
        type="password"
        placeholder="Password"
        {...register("password", {
          required: "You need to input a password",
          minLength: {
            value: 6,
            message: "Password length must be at least 6 characters",
          },
        })}
      />
      {errors.password && (
        <p className="input-error">
          <span>{errors.password.message}</span>
        </p>
      )}
      <span className="label-style">Confirm Password</span>
      <input
        className="input-style"
        type="password"
        placeholder="Confirm Password"
        {...register("confirmPassword", {
          required: "You need to input a password",
          minLength: {
            value: 6,
            message: "Password length must be at least 6 characters",
          },
          validate: (value) =>
            value === watch("password") || "The passwords do not match",
        })}
      />
      {errors.confirmPassword && (
        <p className="input-error">
          <span>{errors.confirmPassword.message}</span>
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
          "UPDATE PASSWORD"
        )}
      </button>
    </form>
  );
};

export default ResetPassword;
