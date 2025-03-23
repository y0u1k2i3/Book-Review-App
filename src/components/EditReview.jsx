import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import "./editreview.css";

function EditReview() {
  const [booktitle, setBookTitle] = useState("");
  const [bookurl, setBookUrl] = useState("");
  const [bookdetail, setBookDetail] = useState("");
  const [review, setReview] = useState("");
  const auth = useSelector((state) => state.auth.isSignIn);
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();
  const { id } = useParams();
  const url = import.meta.env.VITE_BASE_URL;

  // 入力フォーム
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const fetchreview = async () => {
    try {
      const response = await axios.get(`${url}/books/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      reset({
        title: response.data.title,
        url: response.data.url,
        detail: response.data.detail,
        review: response.data.review,
      });
    } catch (err) {
      console.log(err, "apiアクセスに失敗しました");
    }
  };

  const onEditReview = async (data) => {
    try {
      const reviews = {
        title: data.title,
        url: data.url,
        detail: data.detail,
        review: data.review,
      };
      if (auth) {
        await axios.put(`${url}/books/${id}`, reviews, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.token}`,
          },
        });
        navigate(`/detail/${id}`);
      }
    } catch (err) {
      console.log(err, "apiアクセスに失敗しました");
    }
  };

  useEffect(() => {
    if (auth) {
      fetchreview();
    }
  }, [booktitle, bookurl, bookdetail, review]);

  return (
    <main className="editreview">
      <h2>レビュー編集</h2>
      <form onSubmit={handleSubmit(onEditReview)}>
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
        {errors.name && <p className="editreview-error">{errors.name.message}</p>}
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
        {errors.url && <p className="editreview-error">{errors.url.message}</p>}
        <br />
        <br />
        <label htmlFor="detail" className="detail-label">
          書籍の概要
        </label>
        <br />
        <textarea
          id="detail"
          {...register("detail", {
            required: { value: true, message: "書籍の概要を入力してください" },
          })}
        ></textarea>
        {errors.detail && <p className="editreview-error">{errors.detail.message}</p>}
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
        {errors.review && <p className="editreview-error">{errors.review.message}</p>}
        <br />
        <br />
        <button type="submit" className="editreview-button">
          更新
        </button>
        {errors.api && <p className="editreview-error">{errors.api.message}</p>}
        <br />
        <br />
        <Link to={`/delete/${id}`}>
          <button>削除する</button>
        </Link>
        <br />
        <br />
        <Link to={"/"}>
          <button>戻る</button>
        </Link>
      </form>
    </main>
  );
}

export default EditReview;
