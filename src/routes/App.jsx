import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "../components/Header";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import ReviewList from "../components/ReviewList";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<ReviewList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
