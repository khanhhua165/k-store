import { useRouter } from "next/dist/client/router";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoSearch } from "react-icons/io5";

type SearchInput = {
  productName: string;
};

const Searchbar: React.FC = () => {
  const { handleSubmit, register } = useForm<SearchInput>();
  const router = useRouter();
  const onSubmit: SubmitHandler<SearchInput> = ({ productName }) => {
    router.push(`/shop/search/${productName}`);
  };
  return (
    <form className="relative" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Search product..."
        className="w-64 pr-8 bg-gray-100 input-style"
        {...register("productName", { required: true })}
      />
      <IoSearch className="absolute z-30 w-4 h-4 text-indigo-700 right-3 top-3" />
    </form>
  );
};

export default Searchbar;
