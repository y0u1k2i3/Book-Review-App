import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import "./profile.css";

function Profile() {
  const [username, setUserName] = useState("");
  // const [icon, setIcon] = useState("");
  const [iconurl, setIconUrl] = useState("");
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies();
  const url = import.meta.env.VITE_BASE_URL;

  // 入力フォーム
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: { name: username } });

  const navigate = useNavigate();

  // 名前を取得
  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`${url}/users`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      setUserName(response.data.name);
      setIconUrl(response.data.iconUrl);
      reset({ name: response.data.name });
    } catch (err) {
      console.log(err, "apiアクセスに失敗しました");
    }
  };

  // ユーザー情報の更新
  const onUpdate = async (data) => {
    try {
      const users = {
        name: data.name,
      };
      const response = await axios.put(`${url}/users`, users, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.token,
        },
      });
      console.log(response.data.name);
      // レビュー一覧画面に遷移;
      if (auth) {
        navigate("/");
      }
    } catch (err) {
      console.log(err, "apiアクセスに失敗しました");
      console.log(data);
    }
  };

  useEffect(() => {
    if (auth && cookies.token) {
      fetchUserInfo();
    }
  }, [username]);

  return (
    <main className="profile">
      <h2>ユーザー情報</h2>
      <form onSubmit={handleSubmit(onUpdate)}>
        <label htmlFor="text" className="name-label">
          名前
        </label>
        <br />
        <input
          type="text"
          id="text"
          className="name-input"
          {...register("name", {
            required: { value: true, message: "名前を入力してください" },
            minLength: { value: 2, message: "2文字以上の名前にしてください" },
            maxLength: { value: 20, message: "20文字以下の名前にしてください" },
          })}
        />
        {errors.name && <p className="update-error">{errors.name.message}</p>}
        <br />
        <br />
        <button type="submit" className="update-button">
          更新
        </button>
        {errors.api && <p className="update-error">{errors.api.message}</p>}
        <br />
        <br />
        <button>
          <Link to={"/"}>前の画面に戻る</Link>
        </button>
      </form>
    </main>
  );
}

export default Profile;
