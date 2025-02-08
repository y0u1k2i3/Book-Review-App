import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ReviewList() {
  const [reviewlist, setReviewList] = useState([]);

  const url = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    axios.get(`${url}//public/books`)
      .then((response) => {
        console.log(response.data);
        setReviewList(response.data);
      });
      .catch ((err) => {
        console.log(err, "取得に失敗しました");
      });
    });

  return (
    <div>
      <main className="review-list">
        <ul className="review-list-ul">
          {reviewlist.map((review) => {
            return (
              <li className="review-list-li"></li>
            )
          })}
        </ul>
      </main>
    </div>
  );
}

export default ReviewList;
