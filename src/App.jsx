import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ReviewList from "./ReviewList";

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
