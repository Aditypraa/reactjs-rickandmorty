import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

function Pagination({ info, pageNumber, setPageNumber }) {
  const [jumpToValue, setJumpToValue] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Track window size and scroll position
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);

      // Show pagination once user has scrolled even a little bit
      if (position > 20 && !hasScrolled) {
        setHasScrolled(true);
      }

      // Check if we're near the bottom of the page
      const scrollHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollTop = window.scrollY;

      // Consider "at bottom" when within 300px of the bottom
      const bottomThreshold = 300;
      setIsAtBottom(
        scrollHeight - (scrollTop + windowHeight) < bottomThreshold
      );
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasScrolled]);

  // Calculate how many pages to display based on screen size
  const getPageRangeDisplayed = () => {
    if (windowWidth < 400) return 1;
    if (windowWidth < 576) return 2;
    if (windowWidth < 768) return 3;
    return 4;
  };

  const getMarginPagesDisplayed = () => {
    if (windowWidth < 576) return 1;
    return 2;
  };

  // Show abbreviated labels on very small screens
  const getNextLabel = () => {
    return windowWidth < 380 ? "»" : "Next";
  };

  const getPrevLabel = () => {
    return windowWidth < 380 ? "«" : "Prev";
  };

  const handleJumpToPage = (e) => {
    e.preventDefault();
    const pageNum = parseInt(jumpToValue);

    if (pageNum && pageNum > 0 && pageNum <= info?.pages) {
      setPageNumber(pageNum);
      setJumpToValue("");
    } else {
      alert(`Please enter a valid page number between 1 and ${info?.pages}`);
    }
  };

  const handleInputChange = (e) => {
    // Allow only numbers
    const value = e.target.value.replace(/\D/g, "");
    setJumpToValue(value);
  };

  return (
    <div
      className={`
      ${styles.paginationWrapper} 
      ${hasScrolled ? styles.visible : ""} 
      ${scrollPosition > 100 ? styles.sticky : ""} 
      ${isAtBottom ? styles.fullMode : styles.compactMode}
    `}
    >
      {/* Only show page counter when in full mode */}
      {isAtBottom && (
        <div className={styles.pageCounter}>
          <span>
            Page <strong>{pageNumber}</strong> of{" "}
            <strong>{info?.pages || 1}</strong>
          </span>
        </div>
      )}

      <ReactPaginate
        className={`pagination ${styles.pagination}`}
        forcePage={pageNumber === 1 ? 0 : pageNumber - 1}
        nextLabel={<span>{getNextLabel()}</span>}
        previousLabel={<span>{getPrevLabel()}</span>}
        nextClassName={`${styles.navButton} ${styles.nextButton}`}
        previousClassName={`${styles.navButton} ${styles.prevButton}`}
        nextLinkClassName={styles.navLink}
        previousLinkClassName={styles.navLink}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        activeClassName="active"
        onPageChange={(e) => {
          setPageNumber(e.selected + 1);
          // Scroll back to top when changing pages
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        pageCount={info?.pages || 1}
        // Show fewer pages when not at bottom
        marginPagesDisplayed={isAtBottom ? getMarginPagesDisplayed() : 1}
        pageRangeDisplayed={isAtBottom ? getPageRangeDisplayed() : 1}
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        disabledClassName={styles.disabled}
      />

      {/* Only show jump to page on larger screens when in full mode */}
      {info?.pages > 10 && windowWidth > 480 && isAtBottom && (
        <form className={styles.jumpToPage} onSubmit={handleJumpToPage}>
          <label htmlFor="jumpToPage">Jump to:</label>
          <input
            type="text"
            id="jumpToPage"
            value={jumpToValue}
            onChange={handleInputChange}
            placeholder="#"
            maxLength={String(info?.pages).length}
          />
          <button type="submit">Go</button>
        </form>
      )}
    </div>
  );
}

export default Pagination;
