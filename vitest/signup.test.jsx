import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect, beforeEach, vi } from "vitest";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie"; // 追加
import SignUp from "../src/SignUp";

describe("SignUp Component", () => {
  test("新規登録画面の表示", async () => {
    render(<SignUp />);
    expect(screen.getByText("名前")).toBeInTheDocument();
    expect(screen.getByText("メールアドレス")).toBeInTheDocument();
    expect(screen.getByText("パスワード")).toBeInTheDocument();
    expect(screen.getByText("アイコン")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "新規登録" })).toBeInTheDocument();
  })

  // 失敗テスト1
  test("新規登録失敗1", async () => {

  })

  // 失敗テスト1
  test("新規登録失敗1", async () => {

  })

  // 成功テスト
  test("新規登録成功", async () => {

  })
});
