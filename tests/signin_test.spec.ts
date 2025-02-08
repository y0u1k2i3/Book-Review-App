import { test, expect } from "@playwright/test";

// ログインテスト
test("signin test", async ({ page }) => {
    await page.goto("http://localhost:5173/");
    await page.fill(".email-input", "11111");
    await page.fill(".password-input", "55555");
    await page.click(".signin-button");
})