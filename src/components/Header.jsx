import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import "./header.css"
import axios from 'axios';

function Header() {
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const url = import.meta.env.VITE_BASE_URL;

  // 名前を取得
  const response = await axios.get()

  return (
    <header>
      <h1>Tech Book Review</h1>

    </header>
  )
}

export default Header
