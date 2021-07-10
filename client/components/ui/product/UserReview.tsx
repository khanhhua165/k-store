import { Review } from "../../../interfaces/Review.interface";
import { TiStarFullOutline, TiStarOutline } from "react-icons/ti";
const UserReview: React.FC<Review> = ({ comment, name, rating }) => {
  const firstStar = rating >= 1 ? <TiStarFullOutline /> : <TiStarOutline />;
  const secondStar = rating >= 2 ? <TiStarFullOutline /> : <TiStarOutline />;
  const ThirdStar = rating >= 3 ? <TiStarFullOutline /> : <TiStarOutline />;
  const fourthStar = rating >= 4 ? <TiStarFullOutline /> : <TiStarOutline />;
  const fifthStar = rating === 5 ? <TiStarFullOutline /> : <TiStarOutline />;

  return (
    <div className="flex flex-col w-full px-4 py-2 mt-4 space-y-1 border-t border-gray-200">
      <div className="flex space-x-1 text-blue-700">
        {firstStar}
        {secondStar}
        {ThirdStar}
        {fourthStar}
        {fifthStar}
      </div>
      <div className="text-lg font-semibold">{name}</div>
      <div className="">{comment}</div>
    </div>
  );
};

export default UserReview;
