import { test, expect } from "@playwright/test";

// 失敗テスト1
test("ログイン失敗1", async ({ page }) => {
    await page.goto("http://localhost:5173/login");
    await page.click(".signin-button");
    // エラーメッセージの確認
    const error = await page.locator(".signin-error");
    const email_error = await error.nth(0);
    const password_error = await error.nth(1);
    await expect(email_error).toHaveText("メールアドレスを入力してください");
    await expect(password_error).toHaveText("パスワードを入力してください");
})

// 失敗テスト2
test("ログイン失敗2", async ({ page }) => {
    await page.goto("http://localhost:5173/login");
    // メールアドレスの入力
    await page.fill(".email-input", "11111");
    await page.fill(".password-input", "555");
    await page.click(".signin-button");
    // エラーメッセージの確認
    const error = await page.locator(".signin-error");
    const email_error = await error.nth(0);
    const password_error = await error.nth(1);
    await expect(email_error).toHaveText("※正しいメールアドレスを入力してください。");
    await expect(password_error).toHaveText("5文字以上のパスワードを設定してください");
})

// 失敗テスト3
test("ログイン失敗3", async ({ page }) => {
    await page.goto("http://localhost:5173/login");
    // メールアドレスの入力
    await page.fill(".email-input", "11111@mail.com");
    await page.fill(".password-input", "55555");
    await page.click(".signin-button");
    // エラーメッセージの確認
    const error = await page.locator(".signin-error");
    await expect(error).toHaveText("メールアドレスまたはパスワードが間違っています");
})

// 成功テスト
test("ログイン成功", async ({ page }) => {
    await page.goto("http://localhost:5173/login");
    await page.fill(".email-input", "test1@mail.com");
    await page.fill(".password-input", "test1");
    await page.click(".signin-button");
    await page.waitForURL("http://localhost:5173/");
    // ログイン成功後のページの確認
    const url = page.url();
    expect(url).toBe("http://localhost:5173/");
    // const home_h2 = await page.locator("h2");
    // console.log(await home_h2.innerText());
});

// 要素を表示する -> 要素が一致するかチェック
