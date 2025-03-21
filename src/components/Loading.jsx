import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import "./loading.css";

function Loading() {


  return (
    <main>
      <h2>Loading...</h2>
    </main>
  )
}

export default Loading;
