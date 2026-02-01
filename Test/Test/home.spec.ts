import {test, expect} from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';

test.describe("HomePage Test", () => {
    test("Testcase verify HomePage", async ({page}) => {
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);
        
        await loginPage.login("standard_user", "secret_sauce");
        await homePage.verifyHomePage();
    });
    test("Testcase verify Burger Menu Items", async ({page}) => {
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);
        
        await loginPage.login("standard_user", "secret_sauce");
        await homePage.verifyHomePage();
        await homePage.clickBurgerIcon();
        //await homePage.checkItems();
        await homePage.closeBurgerMenu();
    });
    test("Testcase verify Cart Icon", async ({page}) => {
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);
        const cartPage = new CartPage(page);
        await loginPage.login("standard_user", "secret_sauce");
        await homePage.verifyHomePage();
        await homePage.cartIcon.click();
        await expect(page).toHaveURL(/cart.html/);
        await cartPage.returnHomePage.click();
        await homePage.verifyHomePage();
        await expect(page).toHaveURL(/inventory.html/);
    });
    test("Testcase verify Item Details", async ({page}) => {
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);
        
        await loginPage.login("standard_user", "secret_sauce");         
        await homePage.verifyHomePage();
        await homePage.countItem();
        await homePage.checkItemDetail();
    });
});