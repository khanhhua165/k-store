import axios from "axios";
import imageCompression from "browser-image-compression";
import React, { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { API_URL, PRODUCT_ROUTE } from "../../constants/api";
import UserContainer from "../../containers/user/UserContainer";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { Product } from "../../interfaces/Product.interface";
import router from "next/router";
import { ImSpinner2 } from "react-icons/im";

type ProductInputs = {
  name: string;
  description: string;
  productType:
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
    | "Organ"
    | "Supplement"
    | "Package";
  size: string;
  image: FileList | null;
  price: number;
  stock: number;
};

interface Props {
  productId: string;
}

const EditProductForm: React.FC<Props> = ({ productId }) => {
  const [hasFetched, setHasFetched] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [currentImageURL, setCurentImageURL] = useState("");
  const imageUploadRef = useRef<HTMLInputElement | null>(null);
  const initialImageURL = useRef("");
  const { token, isLoggedIn } = UserContainer.useContainer();

  useEffect(() => {
    if (token && isLoggedIn && !hasFetched) {
      (async () => {
        try {
          const data = (
            await axios.get<{ product: Product }>(
              `${API_URL}${PRODUCT_ROUTE}/${productId}`
            )
          ).data.product;
          setProduct(data);
          setCurentImageURL(`${API_URL}/${data.image}`);
          initialImageURL.current = `${API_URL}/${data.image}`;
          setHasFetched(true);
        } catch (e: unknown) {
          toast.error("Something went wrong. Please try again!");
          router.push("/admin/products");
        }
      })();
    }
  }, [token, isLoggedIn, hasFetched]);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductInputs>();

  const { onChange, ref, ...rest } = register("image");

  const fileSelectedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      setCurentImageURL(URL.createObjectURL(e.target.files![0]));
    }
  };

  const onSubmit: SubmitHandler<ProductInputs> = async (
    { description, image, name, price, productType, stock, size },
    e
  ) => {
    e?.target.blur();
    const formData = new FormData();
    if (currentImageURL !== initialImageURL.current) {
      const options = { maxWidthOrHeight: 800 };
      const resizedImage = await imageCompression(
        (image as FileList)[0],
        options
      );
      formData.append("image", resizedImage);
    }

    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price.toString());
    formData.append("productType", productType);
    formData.append("size", size);
    formData.append("stock", stock.toString());
    formData.append(
      "haveImage",
      (currentImageURL !== initialImageURL.current).toString()
    );
    try {
      await axios.patch(`${API_URL}${PRODUCT_ROUTE}/${productId}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Product Saved!!");
      initialImageURL.current = currentImageURL;
    } catch (e) {
      if (e.response) {
        toast.error(e.response.data.message);
      }
    }
  };

  if (!hasFetched || !product) {
    return (
      <div className="flex flex-col items-center mx-4 mt-20 mb-8">
        <div className="flex flex-col items-center text-6xl pt-14">
          <ImSpinner2 className="duration-500 animate-spin" />
        </div>
      </div>
    );
  }

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
        defaultValue={product.name}
        {...register("name", { required: "You need to input a product name" })}
      />
      {errors.name && (
        <p className="input-error">
          <span>{errors.name.message}</span>
        </p>
      )}
      <span className="mt-2 label-style">Product Description</span>
      <textarea
        className="input-style"
        placeholder="Product Description"
        defaultValue={product.description}
        {...register("description", {
          required: "You need to input a description",
        })}
      />
      {errors.description && (
        <p className="input-error">
          <span>{errors.description.message}</span>
        </p>
      )}
      <span className="mt-2 label-style">Product Type</span>
      <select
        className="input-style"
        {...register("productType")}
        defaultValue={product.productType}
      >
        <option value="Beef Steaks">Beef Steaks</option>
        <option value="Beef Whole Cuts">Beef Whole Cuts</option>
        <option value="Ground Beef And Burgers">Ground Beef And Burgers</option>
        <option value="Poultry">Poultry</option>
        <option value="Pork">Pork</option>
        <option value="Lamb">Lamb</option>
        <option value="Cheese">Cheese</option>
        <option value="Fish Products">Fish Products</option>
        <option value="Salt">Salt</option>
        <option value="Honey">Honey</option>
        <option value="Fat">Fat</option>
        <option value="Organs">Organs</option>
      </select>
      <span className="label-style">Product Size</span>
      <input
        className="input-style"
        type="text"
        placeholder="Product Size"
        defaultValue={product.size}
        {...register("size", { required: "You need to input size" })}
      />
      {errors.size && (
        <p className="input-error">
          <span>{errors.size.message}</span>
        </p>
      )}
      <span className="mt-2 label-style">Product Price($)</span>
      <input
        type="text"
        className="input-style"
        placeholder="Product Price"
        defaultValue={product.price}
        {...register("price", {
          required: "You must input a price",
          valueAsNumber: true,
          validate: (value) =>
            value > 0 || "Price cannot be negative or zero or a string",
        })}
      />
      {errors.price && (
        <p className="input-error">
          <span>{errors.price.message}</span>
        </p>
      )}
      <span className="mt-2 label-style">Stock</span>
      <input
        type="text"
        className="input-style"
        placeholder="Stock Value"
        defaultValue={product.stock}
        {...register("stock", {
          required: "You need to input a stock value",
          valueAsNumber: true,
          validate: (value) =>
            value > 0 || "Stock cannot be negative or a string",
        })}
      />
      {errors.stock && (
        <p className="input-error">
          <span>{errors.stock.message}</span>
        </p>
      )}
      <input
        className="hidden"
        type="file"
        accept=".jpg,.png,.jpeg"
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
          value="Save Changes"
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
};

export default EditProductForm;
