import React from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {setCurrentPage, selectPaginationInfo} from '../../features/products/model/productsSlice';

export const Pagination: React.FC = () => {
  const dispatch = useAppDispatch();
  const paginationInfo = useAppSelector(selectPaginationInfo);

  const {
    currentPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
    totalItems,
    itemsPerPage
  } = paginationInfo;

  if (totalPages <= 1) {return null;}

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(setCurrentPage(page));
      
      // Простий scroll до початку сторінки
      setTimeout(() => {
        window.scrollTo({ 
          top: 0, 
          behavior: 'smooth' 
        });
      }, 100);
    }
  };

  const renderPageNumbers = () => {
    const pages: React.ReactElement[] = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {startPage = Math.max(1, endPage - maxVisiblePages + 1);}

    if (startPage > 1) {
      pages.push(
        <li key={1} className="page-item">
          <button 
            className="page-link fw-bold" 
            onClick={() => handlePageChange(1)}
            style={{
              borderRadius: '12px',
              minWidth: '50px',
              height: '50px',
              margin: '0 2px'
            }}
          >
            1
          </button>
        </li>
      );
      if (startPage > 2) {
        pages.push(
          <li key="start-ellipsis" className="page-item disabled">
            <span className="page-link" style={{
              borderRadius: '12px',
              minWidth: '50px',
              height: '50px',
              margin: '0 2px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'rgba(255, 255, 255, 0.5)'
            }}>...</span>
          </li>
        );
      }
    }

    for (let page = startPage; page <= endPage; page++) {
      pages.push(
        <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
          <button 
            className="page-link fw-bold" 
            onClick={() => handlePageChange(page)}
            disabled={page === currentPage}
            style={{
              borderRadius: '12px',
              minWidth: '50px',
              height: '50px',
              margin: '0 2px',
              background: page === currentPage 
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                : 'rgba(255, 255, 255, 0.2)',
              border: page === currentPage 
                ? 'none' 
                : '1px solid rgba(255, 255, 255, 0.3)',
              color: 'white',
              boxShadow: page === currentPage 
                ? '0 4px 15px rgba(102, 126, 234, 0.4)' 
                : 'none'
            }}
          >
            {page}
          </button>
        </li>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <li key="end-ellipsis" className="page-item disabled">
            <span className="page-link" style={{
              borderRadius: '12px',
              minWidth: '50px',
              height: '50px',
              margin: '0 2px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'rgba(255, 255, 255, 0.5)'
            }}>...</span>
          </li>
        );
      }
      pages.push(
        <li key={totalPages} className="page-item">
          <button 
            className="page-link" 
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </button>
        </li>
      );
    }

    return pages;
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="mt-5">
      <div className="text-center mb-4">
        <div className="glass-container d-inline-block px-4 py-2">
          <span className="text-white fw-semibold">
            <i className="bi bi-grid me-2"></i>
            Показано <span className="fw-bold">{startItem}-{endItem}</span> з{' '}
            <span className="fw-bold">{totalItems}</span> товарів
          </span>
        </div>
      </div>
      
      <div className="d-flex justify-content-center">
        <nav aria-label="Навігація по сторінках" className="glass-container px-4 py-3">
          <ul className="pagination pagination-lg mb-0 flex-wrap justify-content-center gap-2">
            <li className={`page-item ${!hasPrevPage ? 'disabled' : ''}`}>
              <button 
                className="page-link fw-bold px-4 py-3" 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={!hasPrevPage}
                aria-label="Попередня сторінка"
                style={{
                  borderRadius: '12px',
                  minWidth: '120px',
                  background: !hasPrevPage ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)'
                }}
              >
                <i className="bi bi-chevron-left me-2"></i>
                Попередня
              </button>
            </li>

            {renderPageNumbers()}

            <li className={`page-item ${!hasNextPage ? 'disabled' : ''}`}>
              <button 
                className="page-link fw-bold px-4 py-3" 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={!hasNextPage}
                aria-label="Наступна сторінка"
                style={{
                  borderRadius: '12px',
                  minWidth: '120px',
                  background: !hasNextPage ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)'
                }}
              >
                Наступна
                <i className="bi bi-chevron-right ms-2"></i>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};