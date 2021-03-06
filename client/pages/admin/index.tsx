import { useRouter } from "next/dist/client/router";
import { getLayoutWithoutFooter } from "../../components/layout/WithoutFooter";
import AdminSummary from "../../components/ui/admin/AdminSummary";
import useAuthenticated from "../../hooks/useAuthenticated";

const Admin = () => {
  const router = useRouter();
  const { isLoading, isLoggedIn, user } = useAuthenticated();
  if (isLoggedIn && !user!.isAdmin) {
    router.replace("/");
  }
  if (!isLoading && !isLoggedIn) {
    router.replace("/");
  }

  if (isLoggedIn && user!.isAdmin) {
    return <AdminSummary />;
  }
  return null;
};

Admin.getLayout = getLayoutWithoutFooter;

export default Admin;
