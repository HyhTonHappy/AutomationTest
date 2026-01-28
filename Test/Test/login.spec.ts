import {test, expect} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
test.describe("Login Test", () => {
    test("Test Login thành công", async ({page}) => {
        const loginPage = new LoginPage(page)

        await loginPage.login("standard_user", "secret_sauce")
        //await page.waitForURL('**dashboard**');
        //await expect(page.locator('body')).toContainText("Thông tin sinh viên");
        await expect(page).toHaveURL(/dashboard/);
        await loginPage.isLoginSuccessful();

    });
    test("Login thất bại với sai mật khẩu", async ({page}) => {
        const loginPage = new LoginPage(page)

        await loginPage.login("standard_user.", "secret_sauce")
        
        await loginPage.isLoginSuccessful() == false;
    });
    test("Login thất bại với sai tài khoản", async({page}) => {
        const loginPage = new LoginPage(page)

        await loginPage.login("eror", "secret_sauce.")

        await loginPage.isLoginSuccessful() == false;
    });
});