import React from "react";
import { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import "./reviewdetail.css";
import Loading from "./Loading";

function ReviewDetail() {
  const [reviewdetail, setReviewDetail] = useState([]);
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();
  const { id } = useParams();
  const url = import.meta.env.VITE_BASE_URL;

  const getReviewDetail = async () => {
    try {
      const response = await axios.get(`${url}/books/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      setReviewDetail(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err, "apiアクセスに失敗しました");
    }
  };

  useEffect(() => {
    if (auth) {
      getReviewDetail();
    }
  }, [auth, id]);

  return (
    <Suspense fallback={<Loading />}>
      <main className="review-detail">
        <h2>レビュー内容</h2>
        <div className="review-detail">
          <h3 className="review-detail__title">{reviewdetail.title}</h3>
          <p className="review-detail__URL">URL: {reviewdetail.url}</p>
          <p className="review-detail__reviewer">レビュワー: {reviewdetail.reviewer}</p>
          <p className="review-detail__review">{reviewdetail.review}</p>
          <p className="review-detail__detail">レビュー内容: {reviewdetail.detail}</p>
        </div>
      </main>
    </Suspense>
  );
}

export default ReviewDetail;
