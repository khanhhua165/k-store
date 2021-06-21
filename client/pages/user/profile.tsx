import { useRouter } from "next/router";
import UserSetting from "../../components/ui/user/UserSetting";
import useAuthenticated from "../../hooks/useAuthenticated";

export default function Profile() {
  const router = useRouter();
  const { isLoading, isLoggedIn } = useAuthenticated();
  if (!isLoading && !isLoggedIn) router.push("/");
  if (!isLoading && isLoggedIn) return <UserSetting />;
  return null;
}
