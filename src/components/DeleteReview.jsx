import React from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import "./deletereview.css";

function DeleteReview() {
  const auth = useSelector((state) => state.auth.isSignIn);
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();
  const { id } = useParams();
  const url = import.meta.env.VITE_BASE_URL;

  // ログアウト処理
  const onDeleteReview = async () => {
    if (auth) {
      await axios.delete(`${url}/books/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
      });
    }
    navigate("/");
  };

  return (
    <main className="signout">
      <h2>レビューを削除しますか？</h2>
      <div className="signout-buttons">
        <button className="signout-buttons__true" onClick={onDeleteReview}>
          はい
        </button>
        <Link to={`/edit/${id}`}>
          <button className="signout-buttons__false">いいえ</button>
        </Link>
      </div>
    </main>
  );
}

export default DeleteReview;
