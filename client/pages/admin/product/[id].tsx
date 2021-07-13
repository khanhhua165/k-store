import { useRouter } from "next/router";
import EditProductForm from "../../../components/forms/EditProductForm";
import { getLayoutWithoutFooter } from "../../../components/layout/WithoutFooter";
import useAuthenticated from "../../../hooks/useAuthenticated";

const ProductEditPage = () => {
  const router = useRouter();
  const { isLoading, isLoggedIn, user } = useAuthenticated();
  if (isLoggedIn && !user!.isAdmin) {
    router.replace("/");
  }
  if (!isLoading && !isLoggedIn) {
    router.replace("/");
  }

  if (isLoggedIn && user!.isAdmin) {
    return (
      <div className="flex flex-col mt-20">
        <EditProductForm productId={router.query.id as string} />
      </div>
    );
  }
  return null;
};

ProductEditPage.getLayout = getLayoutWithoutFooter;

export default ProductEditPage;
