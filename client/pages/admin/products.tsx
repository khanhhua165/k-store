import { useRouter } from "next/router";
import { getLayoutWithoutFooter } from "../../components/layout/WithoutFooter";
import ProductList from "../../components/ui/admin/ProductList";
import useAuthenticated from "../../hooks/useAuthenticated";

const AdminProducts = () => {
  const router = useRouter();
  const { isLoading, isLoggedIn, user } = useAuthenticated();
  if (isLoggedIn && !user!.isAdmin) {
    router.replace("/");
  }
  if (!isLoading && !isLoggedIn) {
    router.replace("/");
  }

  if (isLoggedIn && user!.isAdmin) {
    return <ProductList />;
  }
  return null;
};

AdminProducts.getLayout = getLayoutWithoutFooter;

export default AdminProducts;
