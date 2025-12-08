import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { type Dispatch, type SetStateAction } from "react";

interface PaginationComponentProps {
   currentPage: number;
   setCurrentPage: Dispatch<SetStateAction<number>>;
   totalPages: number;
}

export const PaginationComponent = ({ currentPage, setCurrentPage, totalPages }: PaginationComponentProps) => {
  
  function handlePageChange(page: number) {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  }

   return (
      <Pagination>
         <PaginationContent>
            <PaginationItem>
               <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
            </PaginationItem>
            {currentPage > 1 && (
               <PaginationItem>
                  <PaginationEllipsis />
               </PaginationItem>
            )}
            <PaginationItem>
               <PaginationLink isActive>
                  {currentPage}
               </PaginationLink>
            </PaginationItem>
            {currentPage < (totalPages ?? 2) && (
               <PaginationItem>
                  <PaginationEllipsis />
               </PaginationItem>
            )}
            <PaginationItem>
               <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
            </PaginationItem>
         </PaginationContent>
      </Pagination>
   );
};
