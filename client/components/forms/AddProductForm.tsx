import React, { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineWarning } from "react-icons/ai";

type ProductInputs = {
  name: string;
  description: string;
  productType: "meat" | "organ" | "supplement" | "package";
  subType:
    | "Beef Steaks"
    | "Beef Whole Cuts"
    | "Ground Beef and Burgers"
    | "Poultry"
    | "Pork"
    | "Lamb"
    | "Veal"
    | "Cheese"
    | "Fish Products"
    | "Salt"
    | "Honey"
    | "none";
  image: FileList;
  price: number;
  stock: number;
};

const AddProductForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductInputs>();
  const [currentImageURL, setCurentImageURL] = useState("");
  const imageUploadRef = useRef<HTMLInputElement | null>(null);
  const { onChange, ref, ...rest } = register("image", {
    required: "You need to choose a product image",
  });
  const fileSelectedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      setCurentImageURL(URL.createObjectURL(e.target.files![0]));
    }
  };
  const onSubmit: SubmitHandler<ProductInputs> = (data, e) => {
    console.log(data);
    e?.preventDefault();
  };
  return (
    <form
      className="flex flex-col w-3/4 max-w-md mx-auto mt-10 mb-4 sm:text-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <span className="label-style">Product Name</span>
      <input
        className="input-style"
        type="text"
        placeholder="Product Name"
        {...register("name", { required: "You need to input a product name" })}
      />
      {errors.name && (
        <p className="input-error">
          <AiOutlineWarning />
          <span>{errors.name.message}</span>
        </p>
      )}
      <span className="mt-2 label-style">Product Description</span>
      <textarea
        className="input-style"
        placeholder="Product Description"
        {...register("description", {
          required: "You need to input a description",
        })}
      />
      {errors.description && (
        <p className="input-error">
          <AiOutlineWarning />
          <span>{errors.description.message}</span>
        </p>
      )}
      <span className="mt-2 label-style">Product Type</span>
      <select className="input-style" {...register("productType")}>
        <option value="meat">Meat</option>
        <option value="organ">Organ</option>
        <option value="supplement">Supplement</option>
        <option value="package">Package</option>
      </select>
      <span className="mt-2 label-style">Product Subtype</span>
      <select className="input-style" {...register("subType")}>
        <option value="none">none</option>
        <option value="Beef Steaks">Beef Steaks</option>
        <option value="Beef Whole Cuts">Beef Whole Cuts</option>
        <option value="Ground Beef and Burgers">Ground Beef and Burgers</option>
        <option value="Poultry">Poultry</option>
        <option value="Pork">Pork</option>
        <option value="Lamb">Lamb</option>
        <option value="Veal">Veal</option>
        <option value="Cheese">Cheese</option>
        <option value="Fish Products">Fish Products</option>
        <option value="Salt">Salt</option>
        <option value="Honey">Honey</option>
      </select>
      <span className="mt-2 label-style">Product Price($)</span>
      <input
        type="text"
        className="input-style"
        placeholder="Product Price"
        {...register("price", {
          required: "You must input a price",
          valueAsNumber: true,
          validate: (value) =>
            value > 0 || "Price cannot be negative or zero or a string",
        })}
      />
      {errors.price && (
        <p className="input-error">
          <AiOutlineWarning />
          <span>{errors.price.message}</span>
        </p>
      )}
      <span className="mt-2 label-style">Stock</span>
      <input
        type="text"
        className="input-style"
        placeholder="Product Price"
        {...register("stock", {
          required: "You need to input a stock value",
          valueAsNumber: true,
          validate: (value) =>
            value > 0 || "Stock cannot be negative or a string",
        })}
      />
      {errors.stock && (
        <p className="input-error">
          <AiOutlineWarning />
          <span>{errors.stock.message}</span>
        </p>
      )}
      <input
        className="hidden"
        type="file"
        {...rest}
        onChange={fileSelectedHandler}
        ref={(e) => {
          ref(e);
          imageUploadRef.current = e;
        }}
      />
      {currentImageURL ? (
        <img
          className="object-cover mt-4 rounded-md"
          src={currentImageURL}
          alt=""
        />
      ) : null}
      {errors.image && (
        <p className="input-error">
          <AiOutlineWarning />
          <span>{errors.image.message}</span>
        </p>
      )}
      <div className="flex items-center mt-3 space-x-4">
        <button
          className="flex-1 p-2 bg-blue-500 outline-none w-52 rounded-xl hover:bg-blue-600 active:bg-blue-700 text-gray-50"
          onClick={(e) => {
            e.preventDefault();
            imageUploadRef.current?.click();
          }}
        >
          Choose Image
        </button>
        <input
          className="flex justify-start flex-1 p-2 bg-blue-500 outline-none cursor-pointer rounded-xl hover:bg-blue-600 active:bg-blue-700 text-gray-50"
          type="submit"
          value="Add New Product"
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
};

export default AddProductForm;