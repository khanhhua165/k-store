import { useRouter } from "next/router";
import { getLayoutWithoutFooter } from "../../components/layout/WithoutFooter";
import OrderList from "../../components/ui/admin/OrderList";
import useAuthenticated from "../../hooks/useAuthenticated";

const AdminOrders = () => {
  const router = useRouter();
  const { isLoading, isLoggedIn, user } = useAuthenticated();
  if (isLoggedIn && !user!.isAdmin) {
    router.replace("/");
  }
  if (!isLoading && !isLoggedIn) {
    router.replace("/");
  }

  if (isLoggedIn && user!.isAdmin) {
    return <OrderList />;
  }
  return null;
};

AdminOrders.getLayout = getLayoutWithoutFooter;

export default AdminOrders;
