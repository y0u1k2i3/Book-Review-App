import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./header.css";

function Header() {
  const [name, setName] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies();
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const url = import.meta.env.VITE_BASE_URL;

  // 名前を取得
  const fetch_name = async () => {
    try {
      const response = await axios.get(`${url}/users`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.token,
        },
      });
      setName(response.data.name);
    } catch (err) {
      console.log(err, "apiアクセスに失敗しました");
    }
  };

  useEffect(() => {
    if (auth) {
      fetch_name();
    }
  });

  return (
    <header className="header">
      <h1 className="header__title">Tech Book Review</h1>
      {auth ? (
        // <div className="header__ul">
        <ul className="header__ul">
          <li className="header__li">
            <span>{name}</span> さん
          </li>
          {/* <Link to="/signout">ログアウト</Link> */}
          <li className="header__li">ログアウト</li>
        </ul>
      ) : (
        // </div>
        // <div className="header__ul">
        <ul className="header__ul">
          <Link to="/signin">ログイン</Link>
        </ul>
        // </div>
      )}
    </header>
  );
}

export default Header;
