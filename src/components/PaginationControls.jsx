import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { nextpage, prevpage } from "../routes/reviewSlice";
import "./paginationcontrols.css";

function PaginationControls() {
  const offset = useSelector((state) => state.review.offset);
  const dispatch = useDispatch();
  const next = () => dispatch(nextpage());
  const prev = () => dispatch(prevpage());

  return (
    <div className="pagination">
      <button className="pagination__button" onClick={prev} disabled={offset === 0}>
        前へ
      </button>
      <button className="pagination__button" onClick={next}>
        次へ
      </button>
    </div>
  );
}

export default PaginationControls;
