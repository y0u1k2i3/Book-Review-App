import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./reviewlist.css";
import PaginationControls from "./PaginationControls";

function ReviewList() {
  const [reviewlist, setReviewList] = useState([]);
  const offset = useSelector((state) => state.review.offset);
  const url = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    axios
      .get(`${url}//public/books?offset=${offset}`)
      .then((response) => {
        setReviewList(response.data);
      })
      .catch((err) => {
        console.log(err, "取得に失敗しました");
      });
  }, [offset, reviewlist]);

  return (
    <main className="review">
      <h2 className="review__title">レビュー一覧</h2>
      <button>
        <Link to={"/new"}>レビュー投稿</Link>
      </button>
      <ul className="review-list">
        {reviewlist.map((review) => {
          return (
            <li className="review-list__item" key={review.id}>
              <h3 className="review-list__title"><Link to={`/detail/${review.id}`}>{review.title}</Link></h3>
              {/* <p className="review-list__URL">URL: {review.url}</p>
              <p className="review-list__reviewer">レビュワー: {review.reviewer}</p>
              <p className="review-list__review">{review.review}</p>
              <p className="review-list__detail">レビュー内容: {review.detail}</p> */}
            </li>
          );
        })}
      </ul>
      <PaginationControls />
    </main>
  );
}

export default ReviewList;
