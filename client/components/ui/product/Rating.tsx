import clsx from "clsx";
import React from "react";
import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from "react-icons/ti";

interface Props {
  rating: number;
  numReviews: number;
  inline: boolean;
  fontSize: string;
}
const Rating: React.FC<Props> = ({ numReviews, rating, inline, fontSize }) => {
  const isInline = clsx({
    "flex-col": !inline,
    "space-x-2": inline,
    "items-center": inline,
  });
  const firstStar =
    rating >= 1 ? (
      <TiStarFullOutline />
    ) : rating >= 0.5 ? (
      <TiStarHalfOutline />
    ) : (
      <TiStarOutline />
    );
  const secondStar =
    rating >= 2 ? (
      <TiStarFullOutline />
    ) : rating >= 1.5 ? (
      <TiStarHalfOutline />
    ) : (
      <TiStarOutline />
    );
  const thirdStar =
    rating >= 3 ? (
      <TiStarFullOutline />
    ) : rating >= 2.5 ? (
      <TiStarHalfOutline />
    ) : (
      <TiStarOutline />
    );
  const fourthStar =
    rating >= 4 ? (
      <TiStarFullOutline />
    ) : rating >= 3.5 ? (
      <TiStarHalfOutline />
    ) : (
      <TiStarOutline />
    );
  const fifthStar =
    rating === 5 ? (
      <TiStarFullOutline />
    ) : rating >= 4.5 ? (
      <TiStarHalfOutline />
    ) : (
      <TiStarOutline />
    );
  return (
    <div className={`flex ${isInline} ${fontSize}`}>
      <div className="flex space-x-0.5 text-blue-500">
        {firstStar}
        {secondStar}
        {thirdStar}
        {fourthStar}
        {fifthStar}
      </div>
      <div className="">
        {numReviews} {numReviews === 0 ? "Review" : "Reviews"}
      </div>
    </div>
  );
};

export default Rating;
