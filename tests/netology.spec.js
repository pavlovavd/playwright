const { test, expect } = require('@playwright/test');
const user = require('../user.js');

test("successful authorizationt", async ({page}) => {
    await page.goto("https://netology.ru/?modal=sign_in");

    await page.locator('[placeholder="Email"]').fill(user.email);
    await page.locator('[placeholder="Пароль"]').fill(user.pass);
    await page.getByTestId ('login-submit-btn').click();
    await page.waitForURL('https://netology.ru/profile');
    const header = await page.locator('h2').first();
    await expect(header).toHaveText('Мои курсы и профессии');
});

test("unsuccessful authorizationt", async ({page}) => {
    await page.goto("https://netology.ru/?modal=sign_in");

    await page.locator('[placeholder="Email"]').fill(user.invalidEmail);
    await page.locator('[placeholder="Пароль"]').fill(user.invalidPass);
    await page.getByTestId ('login-submit-btn').click();
    const errorMessage = await page.locator('[data-testid="login-error-hint"]');
    await page.locator('[data-testid="profile-personal-info-avatar-popup"]');
    expect(errorMessage).toBeVisible
});