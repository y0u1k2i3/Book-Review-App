import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { signOut } from "../routes/authSlice";
import "./signout.css";

function SignOut() {
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();

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
        <Link to={"/"}>
          <button className="signout-buttons__false">いいえ</button>
        </Link>
      </div>
    </main>
  );
}

export default SignOut;
