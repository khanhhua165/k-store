import { useRouter } from "next/dist/client/router";
import SignUpForm from "../components/forms/SignUpForm";
import useAuthenticated from "../hooks/useAuthenticated";

export default function SignUp() {
  const router = useRouter();
  const { isLoading, isLoggedIn } = useAuthenticated();
  if (isLoggedIn) router.push("/");
  if (isLoading) return null;
  if (!isLoading && isLoggedIn) return null;
  return <SignUpForm />;
}
