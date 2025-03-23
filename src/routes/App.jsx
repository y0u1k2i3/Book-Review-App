import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import Header from "../components/Header";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import SignOut from "../components/SignOut";
import ReviewList from "../components/ReviewList";
import Profile from "../components/Profile";
import PostReview from "../components/PostReview";
import ReviewDetail from "../components/ReviewDetail";
import EditReview from "../components/EditReview";
import DeleteReview from "../components/DeleteReview";

function App() {
  const auth = useSelector((state) => state.auth.isSignIn);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/signin" element={auth ? <Navigate replace to="/" /> : <SignIn />} />
        <Route path="/signup" element={auth ? <Navigate replace to="/" /> : <SignUp />} />
        <Route path="signout" element={<SignOut />} />
        <Route path="/" element={<ReviewList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/new" element={<PostReview />} />
        <Route path="/detail/:id" element={<ReviewDetail />} />
        <Route path="/edit/:id" element={<EditReview />} />
        <Route path="/delete/:id" element={<DeleteReview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
