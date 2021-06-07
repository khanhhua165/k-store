import axios from "axios";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineWarning } from "react-icons/ai";
import { API_URL, USER_ROUTE } from "../../constants/api";
import { HOUR_IN_MILLISECOND } from "../../constants/time";
import UserContainer from "../../containers/user/UserContainer";
import { SigninResponse } from "../../interfaces/User.interface";

export type SignInInputs = {
  email: string;
  password: string;
};

const SignInForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInInputs>();
  const router = useRouter();
  const { login } = UserContainer.useContainer();
  const [loginErr, setLoginErr] = useState("");
  const onSubmit: SubmitHandler<SignInInputs> = async (data, e) => {
    e?.preventDefault();
    try {
      const result = await axios.post<SigninResponse>(
        `${API_URL}${USER_ROUTE}/login`,
        { ...data }
      );
      const userSignUpData = result.data.user;
      setLoginErr("");
      console.log(result.data.token);
      login(
        userSignUpData,
        result.data.token,
        new Date(new Date().getTime() + HOUR_IN_MILLISECOND)
      );
      router.push("/");
    } catch (e) {
      if (e.response) {
        setLoginErr("Cannot sign in with current credentials!");
      }
    }
  };
  return (
    <form
      className="flex flex-col w-3/4 max-w-md mx-auto mb-4 mt-28 sm:text-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
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
      {loginErr && (
        <p className="input-error">
          <AiOutlineWarning />
          <span>{loginErr}</span>
        </p>
      )}
      <button
        disabled={isSubmitting}
        type="submit"
        className="flex justify-center py-2 mt-3 bg-blue-600 border-2 border-gray-300 rounded-md cursor-pointer text-gray-50 hover:bg-blue-700 focus:bg-blue-800"
      >
        SIGN IN
      </button>
      <div className="flex mt-2 space-x-2">
        <span className="text-gray-500">New Customer?</span>
        <Link href="/signup">
          <a className="font-semibold hover:text-red-500">Sign up</a>
        </Link>
      </div>
      <div className="mt-1">
        <Link href="/password-recovery">
          <a className="font-semibold hover:text-red-500">
            Forgot your password?
          </a>
        </Link>
      </div>
    </form>
  );
};

export default SignInForm;
