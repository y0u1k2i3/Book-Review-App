import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import SignUp from "../src/components/SignUp";
import { BrowserRouter } from "react-router-dom";

describe("SignUp Component", () => {
  test("新規登録画面の表示", async () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );
    expect(screen.getByText("名前")).toBeInTheDocument();
    expect(screen.getByText("メールアドレス")).toBeInTheDocument();
    expect(screen.getByText("パスワード")).toBeInTheDocument();
    expect(screen.getByText("アイコン")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "新規登録" })).toBeInTheDocument();
  });
});
