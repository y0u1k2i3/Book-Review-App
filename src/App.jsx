import React from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

function App() {
  return (
    <BrowserRouter>
        <Header />
          <Routes>
            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={< SignUp/>} />
          </Routes>
    </BrowserRouter>
  );
}

export default App;
