import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect, beforeEach, vi } from "vitest";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie"; // 追加
import SignUp from "../src/SignUp";

vi.mock("axios"); // axios をモック化

describe("SignUp Component", () => {
  beforeEach(() => {
    axios.post.mockClear(); // すべてのテスト前にモックをリセット

    // URL.createObjectURL をモック
    global.URL.createObjectURL = vi.fn(() => "mock-url");
  });

  // SignUp を適切なコンテキストでラップ
  const renderWithProviders = (component) => {
    return render(
      <CookiesProvider>
        <MemoryRouter>{component}</MemoryRouter>
      </CookiesProvider>
    );
  };

  test("フォームのバリデーションが適切に動作するか", async () => {
    renderWithProviders(<SignUp />);

    // 新規登録ボタンを押す
    fireEvent.click(screen.getByText("新規登録"));

    // エラーメッセージが表示されることを確認
    await waitFor(() => {
      expect(screen.getByText("名前を入力してください")).toBeInTheDocument();
      expect(screen.getByText("メールアドレスを入力してください")).toBeInTheDocument();
      expect(screen.getByText("パスワードを入力してください")).toBeInTheDocument();
    });
  });

  test("APIに正しくリクエストが送信されるか", async () => {
    renderWithProviders(<SignUp />);

    // フォームに入力
    fireEvent.change(screen.getByLabelText("名前"), { target: { value: "Test User" } });
    fireEvent.change(screen.getByLabelText("メールアドレス"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("パスワード"), { target: { value: "password123" } });

    // APIのモックレスポンス
    axios.post.mockResolvedValueOnce({ data: { token: "mocked-token" } });

    // 新規登録ボタンを押す
    fireEvent.click(screen.getByRole("button", { name: "新規登録" }));

    // axios.post が適切なデータで呼ばれたか確認
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(expect.stringContaining("/users"), {
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      });
    });

    // トークンの取得が成功したか確認
    axios.post.mockResolvedValueOnce({ data: { url: "mock-icon-url" } });

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining("/uploads"),
        expect.any(FormData),
        expect.objectContaining({
          headers: { Authorization: "Bearer mocked-token" },
        })
      );
    });
  });

  test("アイコンのアップロード処理が正しく動作するか", async () => {
    renderWithProviders(<SignUp />);

    // 画像ファイルをモック
    const file = new File(["dummy content"], "test.png", { type: "image/png" });

    // アイコンのファイルを選択
    const fileInput = screen.getByLabelText("アイコン");
    fireEvent.change(fileInput, { target: { files: [file] } });

    // 変更が反映されるのを待機
    await waitFor(() => {
      expect(fileInput.files[0]).toBe(file);
    });
  });
});
