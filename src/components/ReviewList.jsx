import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./reviewlist.css";
import PaginationControls from "./PaginationControls";

function ReviewList() {
  const [reviewlist, setReviewList] = useState([]);
  const url = import.meta.env.VITE_BASE_URL;
  const dispatch = useDispatch();

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
        <h2 className="review__title">レビュー一覧</h2>
        <ul className="review-list">
          {reviewlist.map((review) => {
            return (
              <li className="review-list__item" key={review.id}>
                <h3 className="review-list__title">{review.title}</h3>
                <p className="review-list__URL">URL: {review.url}</p>
                <p className="review-list__reviewer">レビュワー: {review.reviewer}</p>
                <p className="review-list__review">{review.review}</p>
                <p className="review-list__detail">レビュー内容: {review.detail}</p>
              </li>
            );
          })}
        </ul>
        <PaginationControls />
      </main>
    </div>
  );
}

export default ReviewList;
