function Pagination() {
  return(
   <div>
    <nav className="pagination-container">
      <button className="pagination-button" id="prev-button" title="Previous page" aria-label="Previous page">
        &lt;
      </button>

      <div id="pagination-numbers">
      </div>

      <button className="pagination-button" id="next-button" title="Next page" aria-label="Next page">
        &gt;
      </button>
    </nav>
  </div>
  )
}

export default Pagination;