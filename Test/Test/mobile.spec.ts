import {test, expect} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
test.describe("Mobile Login Tests", () => {
    test("Test Login thành công", async ({page}) => {
        await page.setViewportSize({width: 375, height: 667}); //iphone 6, 7, 8
        const loginPage = new LoginPage(page)

        await loginPage.login("standard_user", "secret_sauce")
        //await page.waitForURL('**dashboard**');
        //await expect(page.locator('body')).toContainText("Thông tin sinh viên");
        await expect(page).toHaveURL(/dashboard/);

    });
    test("Login thất bại với sai mật khẩu", async ({page}) => {
        await page.setViewportSize({width: 375, height: 667}); //iphone 6, 7, 8
        const loginPage = new LoginPage(page)

        await loginPage.login("standard_user.", "secret_sauce")
        await expect(loginPage.errorMessage).toBeVisible();
        //await loginPage.isLoginSuccessful() == false;
    });
    test("Login thất bại với sai tài khoản", async({page}) => {
        await page.setViewportSize({width: 375, height: 667}); //iphone 6, 7, 8
        const loginPage = new LoginPage(page)

        await loginPage.login("eror", "secret_sauce.")
        await expect(loginPage.errorMessage).toBeVisible();
    });
});