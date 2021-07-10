import { useState } from "react";
import { Review } from "../../../interfaces/Review.interface";
import ProductReviewForm from "../../forms/ProductReviewForm";
import UserReview from "./UserReview";

interface Props {
  setRealNum: (num: number) => void;
  setRealRating: (num: number) => void;
  realNum: number;
  reviews: Review[];
  productId: string;
}

const ProductReview: React.FC<Props> = ({
  setRealNum,
  setRealRating,
  reviews,
  productId,
  realNum,
}) => {
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [allReviews, setAllReviews] = useState(reviews);
  const userRviews = allReviews.map(({ comment, name, rating }, i) => (
    <UserReview comment={comment} name={name} rating={rating} key={i} />
  ));

  return (
    <div className="flex flex-col items-start py-3 space-y-3 border border-gray-200 rounded-md bg-gray-50">
      <div className="flex w-full px-4 pb-3 text-lg font-semibold text-center uppercase border-b border-gray-200 xs:text-left">
        Product Review
      </div>
      <button
        className="px-3 py-2 mx-4 mt-4 text-white bg-blue-700 rounded-md hover:bg-blue-800 active:bg-blue-900"
        onClick={() => setIsWritingReview(!isWritingReview)}
      >
        {isWritingReview ? "Cancel review" : "Wrtite a review"}
      </button>
      <div className={`${!isWritingReview ? "hidden" : "w-full"}`}>
        <ProductReviewForm
          setRealNum={setRealNum}
          setRealRating={setRealRating}
          productId={productId}
          allReviews={allReviews}
          setAllReviews={setAllReviews}
          realNum={realNum}
        />
      </div>
      {userRviews}
    </div>
  );
};

export default ProductReview;
