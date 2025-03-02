import { test, expect } from "@playwright/test";

// 失敗テスト1
test("ログイン失敗1", async ({ page }) => {
    await page.goto("http://localhost:5173/login");
    await page.click(".signin-button");
    // エラーメッセージの確認
    const error = await page.locator(".signin-error");
    const errors_num = await error.count();
    if (errors_num >= 1) {
        for (var i = 0; i < errors_num; i++) {
            const error_i = await error.nth(i);
            console.log(await error_i.innerText());
        }
    }
    else {
        console.log(await error.innerText());
    }
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
    const errors_num = await error.count();
    if (errors_num >= 1) {
        for (var i = 0; i < errors_num; i++) {
            const error_i = await error.nth(i);
            console.log(await error_i.innerText());
        }
    }
    else {
        console.log(await error.innerText());
    }
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
    const errors_num = await error.count();
    if (errors_num >= 1) {
        for (var i = 0; i < errors_num; i++) {
            const error_i = await error.nth(i);
            console.log(await error_i.innerText());
        }
    }
    else {
        console.log(await error.innerText());
    }
})

// 成功テスト
test("ログイン成功", async ({ page }) => {
    await page.goto("http://localhost:5173/login");
    await page.fill(".email-input", "test1@mail.com");
    await page.fill(".password-input", "test1");
    await page.click(".signin-button");
    await page.waitForURL("http://localhost:5173/");
    // ログイン成功後のページの確認
    const home_h2 = await page.locator("h2");
    console.log(await home_h2.innerText());
});
