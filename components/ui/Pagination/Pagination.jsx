function PagBtn({ children, onClick, disabled = false, active = false }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
    px-3.5 py-1.5
    rounded-lg
    text-xs
    font-semibold
    border
    border-slate-200
    transition-all
    duration-200

    ${
      disabled
        ? "bg-slate-50 text-slate-300 cursor-not-allowed"
        : active
          ? "bg-primary text-white hover:bg-primary-dark"
          : "bg-white text-slate-700 hover:bg-slate-50 cursor-pointer"
    }
  `}
    >
      {children}
    </button>
  );
}
function Pagination({ meta, onPageChange }) {
  const { current_page, last_page } = meta;
  if (!last_page || last_page <= 1) return null;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "6px",
        flexWrap: "wrap",
        marginTop: "8px",
      }}
    >
      <PagBtn
        disabled={current_page === 1}
        onClick={() => onPageChange(current_page - 1)}
      >
        ← Prev
      </PagBtn>
      {Array.from({ length: last_page }, (_, i) => i + 1).map((p) => (
        <PagBtn
          key={p}
          active={p === current_page}
          onClick={() => onPageChange(p)}
        >
          {p}
        </PagBtn>
      ))}
      <PagBtn
        disabled={current_page === last_page}
        onClick={() => onPageChange(current_page + 1)}
      >
        Next →
      </PagBtn>
    </div>
  );
}

export default Pagination;
