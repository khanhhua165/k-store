import { useRouter } from "next/dist/client/router";
import AddProductForm from "../../components/forms/AddProductForm";
import { getLayoutWithoutFooter } from "../../components/layout/WithoutFooter";
import useAuthenticated from "../../hooks/useAuthenticated";

const AddProduct = () => {
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
        <AddProductForm />
      </div>
    );
  }
  return null;
};

AddProduct.getLayout = getLayoutWithoutFooter;

export default AddProduct;
