import axios from "axios";
import React from "react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ImSpinner8 } from "react-icons/im";
import { toast } from "react-toastify";
import { API_URL, PRODUCT_ROUTE } from "../../constants/api";
import UserContainer from "../../containers/user/UserContainer";
import { Review } from "../../interfaces/Review.interface";
import RatingStar from "../ui/product/RatingStar";

interface Props {
  setRealNum: (num: number) => void;
  setRealRating: (num: number) => void;
  allReviews: Review[];
  setAllReviews: (reviews: Review[]) => void;
  productId: string;
  realNum: number;
}

interface Input {
  comment: string;
}

const ProductReviewForm: React.FC<Props> = ({
  setRealNum,
  setRealRating,
  productId,
  allReviews,
  setAllReviews,
  realNum,
}) => {
  const [starNum, setStarNum] = useState(5);
  const [hoverStarNum, setHoverStarNum] = useState(0);
  const { token, isLoggedIn, user } = UserContainer.useContainer();

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm<Input>();

  const ratingStars = [1, 2, 3, 4, 5].map((i) => (
    <RatingStar
      key={i}
      index={i}
      hoverStarNum={hoverStarNum}
      setHoverStarNum={setHoverStarNum}
      setStarNum={setStarNum}
      starNum={starNum}
    />
  ));

  const onSubmit: SubmitHandler<Input> = async ({ comment }, e) => {
    e?.target.blur();
    if (!isLoggedIn || !token) {
      return toast.warning("You need to login before placing a review!");
    }
    try {
      await axios.post(
        `${API_URL}${PRODUCT_ROUTE}/review`,
        { rating: starNum, comment, productId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRealNum(realNum + 1);
      const newRating =
        (allReviews.reduce((acc, cur) => acc + cur.rating, 0) + starNum) /
        (realNum + 1);
      setRealRating(newRating);
      setAllReviews([
        ...allReviews,
        { rating: starNum, comment, name: user!.name },
      ]);
      reset();
      toast.success("Review added successfully!");
    } catch (e) {
      if (e.response.data.message) {
        toast.error("You have already reviewed this product!");
        reset();
      } else {
        toast.error("there was some unexpected error, please try again");
      }
    }
  };
  return (
    <form
      className="flex flex-col flex-grow w-full px-3 py-4 sm:text-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <span className="label-style">Rating</span>
      <div className="flex space-x-1">{ratingStars}</div>

      <span className="label-style">Review</span>
      <textarea
        className="w-full input-style"
        placeholder="Your review..."
        {...register("comment", {
          required: "You need to input a review",
        })}
      />
      {errors.comment && (
        <p className="input-error">
          <span>{errors.comment.message}</span>
        </p>
      )}

      <button
        disabled={isSubmitting}
        type="submit"
        className="flex justify-center w-full max-w-[15rem] py-2 mt-3 bg-blue-600 border-2 border-gray-300 rounded-md cursor-pointer text-gray-50 hover:bg-blue-700 focus:bg-blue-800"
      >
        {isSubmitting ? (
          <span className="duration-300 animate-spin">
            <ImSpinner8 />
          </span>
        ) : (
          "Submit Review"
        )}
      </button>
    </form>
  );
};

export default ProductReviewForm;
