import { useState } from "react";

export function usePagination({ totalItems, pageSize = 10 }) {
    
    const [currentPage, setCurrentPage] = useState(1);
    
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
    
    const goToPage = (page) => {
        const safePage = Math.min(Math.max(1, page), totalPages);
        setCurrentPage(safePage);
    };

    const nextPage = () => goToPage(currentPage + 1);
    const prevPage = () => goToPage(currentPage - 1);
    
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    return {
        currentPage,
        totalPages,
        goToPage,
        nextPage,
        prevPage,
        startIndex,
        endIndex,
    };
}