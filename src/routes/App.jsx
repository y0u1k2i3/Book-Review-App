import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import Header from "../components/Header";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import ReviewList from "../components/ReviewList";

function App() {
  const auth = useSelector((state) => state.auth.isSignIn);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={auth ? <ReviewList /> : <Navigate replace to="/login" />} />
        <Route path="/signup" element={auth ? <ReviewList /> : <Navigate replace to="/signup" />} />
        <Route path="/" element={<ReviewList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
