import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import "./signin.css";
import { signIn } from '../routes/authSlice';

const SignIn = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [loginerror, setLoginError] = useState("");

  // 入力フォーム
  const { register, handleSubmit, formState: { errors } } = useForm();

  const navigate = useNavigate();
  const url = import.meta.env.VITE_BASE_URL;

  // 新規登録処理
  const onSignIn = async (data) => {
    try {
      const users = {
        "email": data.email,
        "password": data.password
      }
      const response = await axios.post(`${url}/signin`, users);
      const token = response.data.token;
      setCookie("token", token, { maxAge: 86400 });
      dispatch(signIn());
      // レビュー一覧画面に遷移;
      if (auth) {
        navigate("/");
      }
    }
    catch (err) {
      console.log(err, "apiアクセスに失敗しました");
      console.log(data);
      // エラーメッセージをアプリ画面に表示
      if (err.response) {
        setLoginError("メールアドレスまたはパスワードが間違っています")
      }
    }
  }

  return (
    <div>
      <main className='signup'>
        <h2>ログイン</h2>
        <form onSubmit={handleSubmit(onSignIn)} noValidate>
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
          {errors.email && <p className="signin-error">{errors.email.message}</p>}
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
          {errors.password && <p className="signin-error">{errors.password.message}</p>}
          <br />
          <br />
          <button type="submit" className="signin-button" >
            ログイン
          </button>
          {loginerror && <p className="signin-error">{loginerror}</p>}
          <br />
          <br />
          <Link to={"/signup"}>新規登録</Link>
        </form>
      </main>
    </div>
  );
};

export default SignIn;
