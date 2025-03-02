import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import Compressor from "compressorjs";
import "./signup.css";

// 1. 名前などをapiで処理して，トークンを生成
// 2. トークンを使ってアイコンをアップロード
const SignUp = () => {
  const [icon, setIcon] = useState("");
  const [iconurl, setIconUrl] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const navigate = useNavigate();
  const url = import.meta.env.VITE_BASE_URL;

  // 入力フォーム
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm();

  // watchを使ってフォームの値を監視
  // const watch_data = watch();
  // console.log(watch_data);

  // 新規登録処理
  const onSignUp = async (data) => {
    try {
      const users = {
        "name": data.name,
        "email": data.email,
        "password": data.password,
      };
      const response = await axios.post(`${url}/users`, users);
      const token = response.data.token;
      setCookie("token", token, { maxAge: 86400 });
      await onIconUpload(token);
    } catch (err) {
      console.log(err, "apiアクセスに失敗しました");
    }
  };

  // アイコンのアップロード処理
  const onIconUpload = async (token) => {
    try {
      const formdata = new FormData();
      formdata.append("icon", icon);
      console.log(formdata);
      const response = await axios.post(`${url}/uploads`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      });
      console.log(response.data);
      setIconUrl(response.data.url);
      // レビュー一覧画面に遷移;
      navigate("/");
    }
    catch (err) {
      console.log(err, "アイコンのアップロードに失敗しました");
    }
  };

  // アイコンの圧縮処理
  const handleIconChange = (e) => {
    // 画像ファイルを取得
    const files = e.target;
    const icon_img = e.target.files[0];
    if (files && (icon_img.type === "image/jpeg" || icon_img.type === "image/png")) {
      new Compressor(icon_img, {
        quality: 0.6,
        maxHeight: 150,
        maxWidth: 150,
        success(result) {
          if (result.size < 1024 * 1024) {
            setIcon(result);
          } else {
            setError("icon", { message: "1MB以下の画像を選択してください" });
          }
        },
        error(err) {
          setError("icon", { message: "jpgまたはpng画像を選択してください" });
          console.log(err);
        },
      });
    }
  };

  return (
    <div>
      <main className="signup">
        <h2>新規登録を行います</h2>
        <form onSubmit={handleSubmit(onSignUp)}>
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
          {errors.name && <p className="signup-error">{errors.name.message}</p>}
          <br />
          <br />
          <label htmlFor="email" className="email-label">
            メールアドレス
          </label>
          <br />
          <input
            type="email"
            id="email"
            className="email-input"
            {...register("email", {
              required: { value: true, message: "メールアドレスを入力してください" },
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
                message: "※正しいメールアドレスを入力してください。",
              },
            })}
          />
          {errors.email && <p className="signup-error">{errors.email.message}</p>}
          <br />
          <br />
          <label htmlFor="password" className="password-label">
            パスワード
          </label>
          <br />
          <input
            type="password"
            id="password"
            className="password-input"
            {...register("password", {
              required: { value: true, message: "パスワードを入力してください" },
              minLength: { value: 5, message: "5文字以上のパスワードを設定してください" },
              maxLength: { value: 20, message: "20文字以下のパスワードを設定してください" },
            })}
          />
          {errors.password && <p className="signup-error">{errors.password.message}</p>}
          <br />
          <br />
          <label htmlFor="icon" className="icon-label">
            アイコン
          </label>
          <br />
          <input
            type="file"
            accept="image/jpg, image/png"
            id="icon"
            className="icon-input"
            {...register("icon", { value: true, message: "アイコン画像を選択してください" })}
            onChange={handleIconChange}
          />
          {errors.icon && <p className="signup-error">{errors.icon.message}</p>}
          <br />
          <br />
          <button type="submit" className="signup-button">
            新規登録
          </button>
          {errors.api && <p className="signup-error">{errors.api.message}</p>}
          <br />
          <br />
          <Link to={"/login"}>ログイン画面に戻る</Link>
        </form>
      </main>
    </div>
  );
};

export default SignUp;
