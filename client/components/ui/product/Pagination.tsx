import React from "react";
import clsx from "clsx";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  totalPage: number;
  currentPage: number;
  currentURL: string;
}
const Pagination: React.FC<Props> = ({
  currentPage,
  totalPage,
  currentURL,
}) => {
  const router = useRouter();
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
      router.push(`${currentURL}?page=${currentPage - 1}`);
    }
    if (!isGoBack && !isLastPage) {
      router.push(`${currentURL}?page=${currentPage + 1}`);
    }
  };
  return (
    <div className="flex items-center justify-center w-full max-w-2xl mx-auto mt-6 space-x-1">
      {showFirstPage && (
        <Link href={`${currentURL}?page=1`}>
          <a className="px-3 py-2 font-bold rounded-md hover:bg-blue-700 hover:text-gray-50 active:bg-blue-800">
            1
          </a>
        </Link>
      )}
      <button
        className={`text-xl px-1 py-1 rounded-lg ${previousClasses}`}
        onClick={() => handleClickChangePage(true)}
      >
        <BsChevronLeft />
      </button>
      {hasSecondLeft && (
        <Link href={`${currentURL}?page=${currentPage - 2}`}>
          <a className="px-3 py-2 font-bold rounded-md hover:bg-blue-700 hover:text-gray-50 active:bg-blue-800">
            {currentPage - 2}
          </a>
        </Link>
      )}
      {hasFirstLeft && (
        <Link href={`${currentURL}?page=${currentPage - 1}`}>
          <a className="px-3 py-2 font-bold rounded-md hover:bg-blue-700 hover:text-gray-50 active:bg-blue-800">
            {currentPage - 1}
          </a>
        </Link>
      )}
      <div className="px-3 py-2 font-bold bg-blue-700 rounded-md text-gray-50">
        {currentPage}
      </div>
      {hasFirstRight && (
        <Link href={`${currentURL}?page=${currentPage + 1}`}>
          <a className="px-3 py-2 font-bold rounded-md hover:bg-blue-700 hover:text-gray-50 active:bg-blue-800">
            {currentPage + 1}
          </a>
        </Link>
      )}
      {hasSecondRight && (
        <Link href={`${currentURL}?page=${currentPage + 2}`}>
          <a className="px-3 py-2 font-bold rounded-md hover:bg-blue-700 hover:text-gray-50 active:bg-blue-800">
            {currentPage + 2}
          </a>
        </Link>
      )}
      <button
        className={`text-xl px-1 py-1 rounded-lg ${nextClasses}`}
        onClick={() => handleClickChangePage(false)}
      >
        <BsChevronRight />
      </button>
      {showLastPage && (
        <Link href={`${currentURL}?page=${totalPage}`}>
          <a className="px-3 py-2 font-bold rounded-md hover:bg-blue-700 hover:text-gray-50 active:bg-blue-800">
            {totalPage}
          </a>
        </Link>
      )}
    </div>
  );
};

export default Pagination;
