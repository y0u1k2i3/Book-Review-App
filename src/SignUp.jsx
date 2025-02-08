import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Compressor from "compressorjs";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [icon, setIcon] = useState("");
  const [iconurl, setIconUrl] = useState("");
  const [token, setToken] = useState("");
  // const [error, setError] = useState("");

  const url = import.meta.env.VITE_BASE_URL;

  // 入力フォーム
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  // 新規登録処理
  const onSignUp = (data) => {
    try {
      const users = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      axios
        .post(`${url}/users`, users)
        .then((response) => {
          console.log(response.data);
          setToken(response.data.token);
        })
        .catch((err) => {
          console.log(err, "登録に失敗しました");
        });
    } catch (err) {
      console.log(err, "apiアクセスに失敗しました");
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
            const formdata = new FormData();
            formdata.append("icon", result);
            console.log(formdata);
            console.log(token);
            setIcon(result);
            axios
              .post(`${url}/uploads`, formdata, {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: "Bearer " + token,
                },
              })
              .then((response) => {
                console.log(response.data);
                setIconUrl(response.data.url);
              })
              .catch((err) => {
                console.log(err, "アイコンのアップロードに失敗しました");
              });
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
      <main className="signup" onSubmit={handleSubmit(onSignUp)}>
        <h2>新規登録</h2>
        <form>
          <label htmlFor="text" className="name-label">
            名前
          </label>
          <br />
          <input
            type="text"
            id="text"
            className="name-input"
            {...register("name", { required: true, minLength: 2, maxLength: 20 })}
          />
          {errors.name && <p className="signin-error">{errors.name.message}</p>}
          <br />
          <label htmlFor="email" className="email-label">
            メールアドレス
          </label>
          <br />
          <input
            type="email"
            id="email"
            className="email-input"
            {...register("email", { required: true })}
          />
          {errors.email && <p className="signin-error">{errors.email.message}</p>}
          <br />
          <label htmlFor="password" className="password-label">
            パスワード
          </label>
          <br />
          <input
            type="password"
            id="password"
            className="password-input"
            {...register("password", { required: true, minLength: 5, maxLength: 20 })}
          />
          {errors.password && <p className="signin-error">{errors.password.message}</p>}
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
            {...register("icon", { required: true })}
            onChange={handleIconChange}
          />
          {errors.icon && <p className="signin-error">{errors.icon.message}</p>}
          <br />
          <button type="submit" className="signin-button">
            新規登録
          </button>
          {errors.api && <p className="signin-error">{errors.api.message}</p>}
          <br />
          <Link to={"/"}>ログイン画面に戻る</Link>
        </form>
      </main>
    </div>
  );
};

export default SignUp;
