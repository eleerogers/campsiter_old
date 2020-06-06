import { useState } from 'react';

function usePagination(data, itemsPerPage) {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(data.length / itemsPerPage);

  function currentData() {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return data.slice(begin, end);
  }

  function next() {
    setCurrentPage((currPage) => Math.min(currPage + 1, maxPage));
  }

  function prev() {
    setCurrentPage((currPage) => Math.max(currPage - 1, 1));
  }

  function jump(page) {
    const pageNumber = Math.max(1, page);
    setCurrentPage(Math.min(pageNumber, maxPage));
  }

  return {
    next, prev, jump, currentData, currentPage, maxPage
  };
}

export default usePagination;