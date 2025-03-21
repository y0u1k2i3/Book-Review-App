import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import "./postreview.css";

function PostReview() {
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();
  const url = import.meta.env.VITE_BASE_URL;

  // 入力フォーム
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onPostReview = async (data) => {
    try {
      const reviews = {
        title: data.title,
        url: data.url,
        detail: data.detail,
        review: data.review,
      };
      if (auth) {
        await axios.post(`${url}/books`, reviews, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.token}`,
          },
        });
        navigate("/");
      }
    } catch (err) {
      console.log(err, "apiアクセスに失敗しました");
    }
  };

  return (
    <main className="postreview">
      <h2>レビュー投稿</h2>
      <form onSubmit={handleSubmit(onPostReview)}>
        <label htmlFor="title" className="title-label">
          書籍タイトル
        </label>
        <br />
        <input
          type="text"
          id="title"
          className="title-input"
          {...register("title", {
            required: { value: true, message: "書籍タイトルを入力してください" },
          })}
        />
        {errors.name && <p className="postreview-error">{errors.name.message}</p>}
        <br />
        <br />
        <label htmlFor="url" className="url-label">
          書籍URL
        </label>
        <br />
        <input
          type="text"
          id="url"
          className="url-input"
          {...register("url", {
            required: { value: true, message: "書籍URLを入力してください" },
          })}
        />
        {errors.url && <p className="postreview-error">{errors.url.message}</p>}
        <br />
        <br />
        <label htmlFor="detail" className="password-label">
          書籍の概要
        </label>
        <br />
        <textarea
          id="detail"
          {...register("detail", {
            required: { value: true, message: "書籍の概要を入力してください" },
          })}
        ></textarea>
        {errors.detail && <p className="postreview-error">{errors.detail.message}</p>}
        <br />
        <br />
        <label htmlFor="review" className="review-label">
          レビュー内容
        </label>
        <br />
        <textarea
          id="review"
          {...register("review", {
            required: { value: true, message: "レビュー内容を入力してください" },
          })}
        ></textarea>
        {errors.review && <p className="postreview-error">{errors.review.message}</p>}
        <br />
        <br />
        <button type="submit" className="postreview-button">
          投稿
        </button>
        {errors.api && <p className="postreview-error">{errors.api.message}</p>}
        <br />
        <br />
        <button>
          <Link to={"/"}>戻る</Link>
        </button>
      </form>
    </main>
  );
}

export default PostReview;
