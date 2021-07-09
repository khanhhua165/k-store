import { useRouter } from "next/router";
import UserOrderInfo from "../../components/ui/order/UserOrderInfo";
import useAuthenticated from "../../hooks/useAuthenticated";

const UserOrder = () => {
  const router = useRouter();
  const { isLoading, isLoggedIn } = useAuthenticated();
  if (!isLoading && !isLoggedIn) router.replace("/");
  if (!isLoading && isLoggedIn) return <UserOrderInfo />;
  return null;
};

export default UserOrder;
