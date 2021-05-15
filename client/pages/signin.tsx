import { useRouter } from "next/dist/client/router";
import React from "react";
import SignInForm from "../components/forms/SignInForm";
import useAuthenticated from "../components/hooks/useAuthenticated";

export default function SignUp() {
  const router = useRouter();
  const { isLoading, isLoggedIn } = useAuthenticated();
  if (isLoggedIn) router.push("/");
  if (isLoading) {
    return null;
  } else {
    return <SignInForm />;
  }
}
