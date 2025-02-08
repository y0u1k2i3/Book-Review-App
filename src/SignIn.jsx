import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const SignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  // const [error, setError] = useState("");

  // 入力フォーム
  const{ register, handleSubmit, formState: { errors } } = useForm();

  // 新規登録処理
  const onSignIn = () => {
    try {
      const users = {
        name: name,
        email: email,
        password: password
      }
      axios.post("https://railway.bookreview.techtrain.dev/users", users)
      .then((response) => {
        console.log(response.data);
        setToken(response.data.token);
      })
      .catch((err) => {
        console.log(err, "登録に失敗しました");
      });
    }
    catch (err) {
      console.log(err, "apiアクセスに失敗しました");
    }
  }

  return (
    <div>
      <main className='signup' onSubmit={handleSubmit(onSignIn)}>
        <h2>新規登録</h2>
        <form>
          <label htmlFor="text" className="name-label" >名前</label>
          <br />
          <input type="text" id="text" className="name-input"
          {...register("name", { required: true, minLength: 2, maxLength:20 })} />
          {errors.name && <p className='signin-error'>{errors.name.message}</p>}
          <br />
          <label htmlFor="email" className="email-label" >メールアドレス</label>
          <br />
          <input type="email" id="email" className="email-input"
          {...register("email", { required: true })} />
          {errors.email && <p className='signin-error'>{errors.email.message}</p>}
          <br />
          <label htmlFor="password" className="password-label">パスワード</label>
          <br />
          <input type="password" id="password" className="password-input"
          {...register("password", { required: true, minLength: 5, maxLength: 20 })} />
          {errors.password && <p className='signin-error'>{errors.password.message}</p>}
          <br />
          <label htmlFor="icon" className="icon-label" >アイコン</label>
          <br />
          <button type="submit" className="signin-button" >
            ログイン
          </button>
          {errors.api && <p className='signin-error'>{errors.api.message}</p>}
          <br />
          <Link to={"/signup"}>新規登録</Link>
        </form>
      </main>
    </div>
  );
};

export default SignIn;
