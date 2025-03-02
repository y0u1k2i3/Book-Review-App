import React from 'react'

import { render, screen } from "@testing-library/react";
import SignIn from "../src/SignIn";
import { describe, test, expect } from "vitest";

describe("SignIn Component", () => {
  test("email Unit Test", async () => {
    render(<SignIn />);

    // メールアドレスのラベルが表示されていることを確認
    expect(screen.getByLabelText("メールアドレス")).toBeInTheDocument();

    // パスワードの入力欄が表示されていることを確認
    expect(screen.getByLabelText("パスワード")).toBeInTheDocument();

    // サインインボタンが表示されていることを確認
    expect(screen.getByRole("button", { name: "サインイン" })).toBeInTheDocument();
  })
});
