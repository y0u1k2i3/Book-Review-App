import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { signOut } from "../routes/authSlice";
import "./signout.css";

function SignOut() {
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();
  const url = import.meta.env.VITE_BASE_URL;

  // ログアウト処理
  const onSignOut = async () => {
    if (auth) {
      removeCookie("token");
      dispatch(signOut());
      navigate("/signin");
    }
  };

  return (
    <main className="signout">
      <h2>ログアウトしますか？</h2>
      <div className="signout-buttons">
        <button className="signout-buttons__true" onClick={onSignOut}>
          はい
        </button>
        <button className="signout-buttons__false">
          <Link to={"/"}>いいえ</Link>
        </button>
      </div>
    </main>
  );
}

export default SignOut;
