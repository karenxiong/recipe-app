import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";

const PaginationNumbers = ({ page, totalPages, pageSize, setPage }) => {
  const PageNumbers = () => {
    // Contains the 1, 2, 3... page numbers for the pagination
    const pages = [];

    let startPage = Math.max(1, page - 2);
    let endPage = Math.min(totalPages, startPage + pageSize - 1);

    if (endPage - startPage < pageSize - 1) {
      startPage = Math.max(1, endPage - pageSize + 1);
    }
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            className="cursor-pointer"
            isActive={page === i}
            onClick={() => {
              if (page !== i) setPage(i);
            }}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return pages;
  };

  return totalPages > 1 ? (
    <Pagination className="mt-10">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={`${
              page === 1
                ? "cursor-default text-gray-400"
                : "cursor-pointer text-black hover:text-coral"
            } transition`}
            disabled={page === 1}
            onClick={() => {
              if (page > 1) {
                setPage(page - 1);
              }
            }}
          />
        </PaginationItem>
        <PageNumbers />
        <PaginationItem>
          <PaginationNext
            className={`${
              page === totalPages
                ? "cursor-default text-gray-400"
                : "cursor-pointer text-black hover:text-coral"
            } transition`}
            disabled={page === totalPages}
            onClick={() => {
              if (page < totalPages) {
                setPage(page + 1);
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ) : null;
};

export default PaginationNumbers;
