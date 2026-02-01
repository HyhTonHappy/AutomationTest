import {Page, Locator, expect} from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly cartTitle: Locator;
    readonly returnHomePage: Locator;

    constructor (page: Page) {
        this.page = page;
        this.cartTitle = page.locator('span[class="title"]');
        this.returnHomePage = page.locator('button[id="continue-shopping"]');
    }
    async verifyCartPage() {
        await expect(this.cartTitle).toHaveText('Your Cart',{timeout:1000});
    }

    async backToHomePage() {
        this.returnHomePage.click();
    }
       
}