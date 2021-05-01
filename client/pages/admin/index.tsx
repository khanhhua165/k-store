import { useState } from "react";
import AddProductForm from "../../components/AddProductForm";

export default function Admin() {
  const [currentTab, setCurrentTab] = useState("add product");
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
