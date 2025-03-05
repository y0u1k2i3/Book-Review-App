import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./reviewlist.css";

function ReviewList() {
  const [reviewlist, setReviewList] = useState([]);

  const url = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    axios
      .get(`${url}//public/books`)
      .then((response) => {
        // console.log(response.data);
        setReviewList(response.data);
      })
      .catch((err) => {
        console.log(err, "取得に失敗しました");
      });
  });

  return (
    <div>
      <main className="review">
        <h2 className="">レビュー一覧</h2>
        <ul className="review-list">
          {reviewlist.map((review) => {
            return (
              <li className="review-list__item" key={review.id}>
                <h3>{review.title}</h3>
                <p className="">URL: {review.url}</p>
                <p className="">レビュワー: {review.reviewer}</p>
                <p className="">{review.review}</p>
                <p className="">レビュー内容: {review.detail}</p>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}

export default ReviewList;
