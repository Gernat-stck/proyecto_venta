import React from "react";
import { Button } from "./ui/button";

const Pagination = ({ totalItems, itemsPerPage, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center mt-4">
      <ul className="flex">
        {pageNumbers.map((number) => (
          <li key={number} className="mx-1">
            <Button
              onClick={() => paginate(number)}
              className={`${
                currentPage === number
                  ? "bg-indigo-500 text-white"
                  : "bg-indigo-200 text-gray-700"
              } px-4 py-2 rounded-md transition duration-300 ease-in-out hover:bg-indigo-700`}
            >
              {number}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
