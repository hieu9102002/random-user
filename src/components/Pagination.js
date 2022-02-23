import React, { useEffect, useState } from "react";

const Pagination = ({
  usersPerPage,
  noUsers,
  maxPagesAdjToCurrent,
  paginate,
}) => {
  const [curPage, changeCurPage] = useState(1);
  const [pageNumbers, changePageNumbers] = useState([]);

  const maxPages = Math.ceil(noUsers / usersPerPage);

  const range = (start, end, step = 1) => {
    const range = [];

    for (let i = start; i <= end; i += step) range.push(i);

    return range;
  };

  // 1 ... 4 5 [6] 7 8 ... 10
  // 1 2 3 4 5

  const getPageNumbers = () => {
    const totalNumbers = maxPagesAdjToCurrent * 2 + 3; //Number of numbers in pagination component
    const totalBlocks = totalNumbers + 2; //Adding the ... blocks

    if (maxPages > totalBlocks) {
      //More pages than the maximum blocks in component
      const startPage = Math.max(2, curPage - maxPagesAdjToCurrent);
      const endPage = Math.min(maxPages - 1, curPage + maxPagesAdjToCurrent);

      let pages = range(startPage, endPage);

      const haveLeftSpill = startPage > 2; //has 3 dots to the left
      const haveRightSpill = endPage < maxPages - 1;

      if (haveLeftSpill && haveRightSpill)
        // 1 < 3 4 [5] 6 7 > 10
        pages = ["...", ...pages, "..."];
      else if (haveLeftSpill) pages = ["...", ...pages];
      else if (haveRightSpill) pages = [...pages, "..."];

      return [1, ...pages, maxPages];
    }
    return range(1, maxPages);
  };

  const goToPage = (page) => {
    changeCurPage(page);
    paginate(page);
  };

  const goToNextPage = (next) => {
    if(next && curPage < maxPages){
        goToPage(curPage+1);
    } else if (!next && curPage > 1){
        goToPage(curPage-1);
    }
  }

  useEffect(() => {
    changePageNumbers(getPageNumbers());
  }, []);

  useEffect(() => {
    changePageNumbers(getPageNumbers());
  }, [curPage]);

  return (
    <div>
      <ul className="pagination justify-content-center">
        <li className={"page-item" + (curPage == 1?" disabled":"")}>
          <a className="page-link" href="#" aria-label="Previous" onClick={() => goToNextPage(false)}>
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {pageNumbers.map((number, index) => {
          if (number === "...")
            return (
              <li key={index + "..."} className="page-item page-link">
                ...
              </li>
            );
          return (
            <li
              key={number}
              className={(curPage == number ? "active " : "") + "page-item"}
            >
              <a
                href="#"
                className="page-link"
                onClick={() => goToPage(number)}
              >
                {number}
              </a>
            </li>
          );
        })}
        <li className={"page-item" + (curPage == maxPages?" disabled":"")}>
          <a className="page-link" href="#" aria-label="Next" onClick={() => goToNextPage(true)}>
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
