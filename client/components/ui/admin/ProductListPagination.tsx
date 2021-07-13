import React from "react";
import clsx from "clsx";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

interface Props {
  totalPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  setHasFetched: (a: boolean) => void;
}
const ProductListPagination: React.FC<Props> = ({
  currentPage,
  totalPage,
  setCurrentPage,
  setHasFetched,
}) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPage;
  const previousClasses = clsx({
    "cursor-not-allowed": isFirstPage,
    "cursor-pointer": !isFirstPage,
    "hover:bg-gray-200": !isFirstPage,
  });
  const nextClasses = clsx({
    "cursor-not-allowed": isLastPage,
    "cursor-pointer": !isLastPage,
    "hover:bg-gray-200": !isLastPage,
  });
  const hasFirstLeft = currentPage > 1;
  const hasSecondLeft = currentPage > 2;
  const hasFirstRight = currentPage + 1 <= totalPage;
  const hasSecondRight = currentPage + 2 <= totalPage;
  const showFirstPage = currentPage > 3;
  const showLastPage = currentPage < totalPage - 2;

  const handleClickChangePage = (isGoBack: boolean) => {
    if (isGoBack && !isFirstPage) {
      setCurrentPage(currentPage - 1);
    }
    if (!isGoBack && !isLastPage) {
      setCurrentPage(currentPage + 1);
    }
    setHasFetched(false);
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    setHasFetched(false);
  };

  return (
    <div className="flex items-center justify-center w-full max-w-2xl mx-auto mt-6 space-x-1">
      {showFirstPage && (
        <button
          className="px-3 py-2 font-bold rounded-md hover:bg-blue-700 hover:text-gray-50 active:bg-blue-800"
          onClick={() => handleChangePage(1)}
        >
          1
        </button>
      )}
      <button
        className={`text-xl px-1 py-1 rounded-lg ${previousClasses}`}
        onClick={() => handleClickChangePage(true)}
      >
        <BsChevronLeft />
      </button>
      {hasSecondLeft && (
        <button
          className="px-3 py-2 font-bold rounded-md hover:bg-blue-700 hover:text-gray-50 active:bg-blue-800"
          onClick={() => handleChangePage(currentPage - 2)}
        >
          {currentPage - 2}
        </button>
      )}
      {hasFirstLeft && (
        <button
          className="px-3 py-2 font-bold rounded-md hover:bg-blue-700 hover:text-gray-50 active:bg-blue-800"
          onClick={() => handleChangePage(currentPage - 1)}
        >
          {currentPage - 1}
        </button>
      )}
      <div className="px-3 py-2 font-bold bg-blue-700 rounded-md text-gray-50">
        {currentPage}
      </div>
      {hasFirstRight && (
        <button
          className="px-3 py-2 font-bold rounded-md hover:bg-blue-700 hover:text-gray-50 active:bg-blue-800"
          onClick={() => handleChangePage(currentPage + 1)}
        >
          {currentPage + 1}
        </button>
      )}
      {hasSecondRight && (
        <button
          className="px-3 py-2 font-bold rounded-md hover:bg-blue-700 hover:text-gray-50 active:bg-blue-800"
          onClick={() => handleChangePage(currentPage + 2)}
        >
          {currentPage + 2}
        </button>
      )}
      <button
        className={`text-xl px-1 py-1 rounded-lg ${nextClasses}`}
        onClick={() => handleClickChangePage(false)}
      >
        <BsChevronRight />
      </button>
      {showLastPage && (
        <button
          className="px-3 py-2 font-bold rounded-md hover:bg-blue-700 hover:text-gray-50 active:bg-blue-800"
          onClick={() => handleChangePage(totalPage)}
        >
          {totalPage}
        </button>
      )}
    </div>
  );
};

export default ProductListPagination;
