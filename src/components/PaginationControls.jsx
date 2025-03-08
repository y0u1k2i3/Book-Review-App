import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function PaginationControls() {

  return (
    <div className="pagination">
      <button className="pagination__button">前へ</button>
      <button className="pagination__button">次へ</button>
    </div>
  )
}

export default PaginationControls;
