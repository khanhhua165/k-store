import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import AddProductForm from "../../components/forms/AddProductForm";
import useAuthenticated from "../../hooks/useAuthenticated";

export default function Admin() {
  const [currentTab, setCurrentTab] = useState("add product");
  const router = useRouter();
  const { isLoading, isLoggedIn, user } = useAuthenticated();
  if (isLoggedIn && user!.email !== "admin@admin.com") {
    router.push("/");
  }
  if (!isLoading && !isLoggedIn) {
    router.push("/");
  }

  if (isLoggedIn && user!.email === "admin@admin.com") {
    return (
      <div className="flex flex-col mt-20">
        <div className="flex ml-5">
          <div className="flex items-center justify-center px-5 py-3 text-white bg-blue-600 rounded-lg">
            Add Product
          </div>
        </div>
        <AddProductForm />
      </div>
    );
  }
  return null;
}
