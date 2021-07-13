import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ImSpinner8 } from "react-icons/im";
import { toast } from "react-toastify";
import { API_URL, USER_ROUTE } from "../../constants/api";
import { HOUR_IN_MILLISECOND } from "../../constants/time";
import UserContainer from "../../containers/user/UserContainer";
import { SignupResponse } from "../../interfaces/User.interface";

export type SignUpInputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUpForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInputs>();

  const { login } = UserContainer.useContainer();
  const [mailErr, setMailErr] = useState("");
  const onSubmit: SubmitHandler<SignUpInputs> = async ({
    email,
    name,
    password,
  }) => {
    try {
      const result = await axios.post<SignupResponse>(
        `${API_URL}${USER_ROUTE}/register`,
        { email, name, password }
      );
      const userSignUpData = result.data.user;
      setMailErr("");
      login(
        userSignUpData,
        result.data.token,
        new Date(new Date().getTime() + HOUR_IN_MILLISECOND)
      );
      toast.success("Signup successful!");
    } catch (e) {
      if (e.response) {
        setMailErr(e.response.data.message);
      }
    }
  };
  return (
    <form
      className="flex flex-col w-11/12 max-w-md px-3 py-4 mx-auto mb-4 border border-gray-200 rounded-md shadow-md xs:w-3/4 mt-28 sm:text-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <span className="label-style">Name</span>
      <input
        className="input-style"
        type="text"
        placeholder="Your Name"
        {...register("name", {
          required: "You need to input your name",
        })}
      />
      {errors.name && (
        <p className="input-error">
          <span>{errors.name.message}</span>
        </p>
      )}
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
      {mailErr && (
        <p className="input-error">
          <span>{mailErr}</span>
        </p>
      )}
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
          "SIGN UP"
        )}
      </button>
      <div className="flex mt-2 space-x-2">
        <span className="text-gray-500">Already have an account?</span>
        <Link href="/signin">
          <a className="font-semibold hover:text-red-500">Sign in</a>
        </Link>
      </div>
    </form>
  );
};

export default SignUpForm;
