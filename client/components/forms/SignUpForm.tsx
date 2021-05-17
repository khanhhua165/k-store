import axios from "axios";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineWarning } from "react-icons/ai";
import { API_URL, USER_ROUTE } from "../../constants/api";
import UserContainer from "../../containers/user/UserContainer";
import { SignupResponse } from "../../interfaces/User.interface";

export type SignUpInputs = {
  name: string;
  email: string;
  password: string;
};

const SignUpForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInputs>();

  const { login } = UserContainer.useContainer();
  const [mailErr, setMailErr] = useState("");
  const onSubmit: SubmitHandler<SignUpInputs> = async (data, e) => {
    e!.preventDefault();
    try {
      const result = await axios.post<SignupResponse>(
        `${API_URL}${USER_ROUTE}/register`,
        { ...data }
      );
      const userSignUpData = result.data.user;
      setMailErr("");
      login(
        userSignUpData,
        result.data.token,
        new Date(new Date().getTime() + 1000 * 60 * 60)
      );
    } catch (e) {
      if (e.response) {
        setMailErr(e.response.data.message);
      }
    }
  };
  return (
    <form
      className="flex flex-col w-3/4 max-w-md mx-auto mb-4 mt-28 sm:text-lg"
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
          <AiOutlineWarning />
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
          <AiOutlineWarning />
          <span>{errors.email.message}</span>
        </p>
      )}
      {mailErr && (
        <p className="input-error">
          <AiOutlineWarning />
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
          <AiOutlineWarning />
          <span>{errors.password.message}</span>
        </p>
      )}
      <button
        disabled={isSubmitting}
        type="submit"
        className="flex justify-center py-2 mt-3 bg-blue-600 border-2 border-gray-300 rounded-md cursor-pointer text-gray-50 hover:bg-blue-700 focus:bg-blue-800"
      >
        SIGN UP
      </button>
    </form>
  );
};

export default SignUpForm;
