import { useRouter } from "next/router";
import { getLayoutWithoutFooter } from "../../components/layout/WithoutFooter";
import UserList from "../../components/ui/admin/UserList";
import useAuthenticated from "../../hooks/useAuthenticated";

const AdminUserList = () => {
  const router = useRouter();
  const { isLoading, isLoggedIn, user } = useAuthenticated();
  if (isLoggedIn && !user!.isAdmin) {
    router.replace("/");
  }
  if (!isLoading && !isLoggedIn) {
    router.replace("/");
  }

  if (isLoggedIn && user!.isAdmin) {
    return <UserList />;
  }
  return null;
};

AdminUserList.getLayout = getLayoutWithoutFooter;

export default AdminUserList;
