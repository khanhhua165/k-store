import axios from "axios";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineWarning } from "react-icons/ai";
import { API_URL, USER_ROUTE } from "../../constants/api";
import UserContainer from "../../containers/user/UserContainer";
interface Inputs {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}
const PasswordChange: React.FC = () => {
  const { token } = UserContainer.useContainer();
  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async ({
    newPassword,
    oldPassword,
  }) => {
    try {
      await axios.patch(
        `${API_URL}${USER_ROUTE}/password-change`,
        { password: oldPassword, newPassword },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("dddd");
    } catch (e: unknown) {
      console.log(e);
    }
  };

  return (
    <form
      className="flex flex-col w-3/4 max-w-md mx-auto mb-4 sm:text-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <span className="label-style">Current Password</span>
      <input
        className="input-style"
        type="password"
        placeholder="Your current password"
        {...register("oldPassword", {
          required: "You need to input your current password",
          minLength: {
            value: 6,
            message: "password must be at least 6 characters",
          },
        })}
      />
      {errors.oldPassword && (
        <p className="input-error">
          <AiOutlineWarning />
          <span>{errors.oldPassword.message}</span>
        </p>
      )}

      <span className="label-style">New Password</span>
      <input
        className="input-style"
        type="password"
        placeholder="Your new password"
        {...register("newPassword", {
          required: "You need to input a new password",
          minLength: {
            value: 6,
            message: "password must be at least 6 characters",
          },
        })}
      />
      {errors.newPassword && (
        <p className="input-error">
          <AiOutlineWarning />
          <span>{errors.newPassword.message}</span>
        </p>
      )}

      <span className="label-style">New Password Confirmation</span>
      <input
        className="input-style"
        type="password"
        placeholder="Your new password"
        {...register("newPasswordConfirm", {
          required: "You need to input a new password",
          validate: (value) =>
            value === watch("newPassword") || "The passwords do not match",
        })}
      />
      {errors.newPasswordConfirm && (
        <p className="input-error">
          <AiOutlineWarning />
          <span>{errors.newPasswordConfirm.message}</span>
        </p>
      )}
      <button
        disabled={isSubmitting}
        type="submit"
        className="flex justify-center py-2 mt-3 bg-blue-600 border-2 border-gray-300 rounded-md cursor-pointer text-gray-50 hover:bg-blue-700 focus:bg-blue-800"
      >
        Save Changes
      </button>
    </form>
  );
};

export default PasswordChange;
