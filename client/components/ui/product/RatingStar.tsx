import { useCallback } from "react";
import { TiStarFullOutline, TiStarOutline } from "react-icons/ti";

interface Props {
  starNum: number;
  hoverStarNum: number;
  setStarNum: (num: number) => void;
  setHoverStarNum: (num: number) => void;
  index: number;
}

const RatingStar: React.FC<Props> = ({
  hoverStarNum,
  setHoverStarNum,
  setStarNum,
  starNum,
  index,
}) => {
  let isFilled: boolean = false;
  if (hoverStarNum >= index) isFilled = true;
  if (hoverStarNum === 0 && starNum >= index) isFilled = true;

  const handleClick = useCallback(() => {
    setStarNum(index);
  }, []);
  const handleEnter = useCallback(() => {
    setHoverStarNum(index);
  }, []);

  const handleLeave = useCallback(() => {
    setHoverStarNum(0);
  }, []);

  return (
    <div
      className="text-lg text-blue-500 cursor-pointer"
      onClick={handleClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {isFilled ? <TiStarFullOutline /> : <TiStarOutline />}
    </div>
  );
};

export default RatingStar;
