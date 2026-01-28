import {Page, Locator} from '@playwright/test';

export class LoginPage {
    // Locator
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    // function: login, validate
    constructor (page: Page) {
        this.page = page;
        this.usernameInput = page.locator('input[name="user-name"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.loginButton = page.locator('input[type="submit"]');
    }   
    async login(username: string, password: string){
        await this.page.goto('https://www.saucedemo.com');
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async isLoginSuccessful(): Promise<boolean> {
        // case 1: test url có chữ dashborad
        let url = this.page.url();
        if(url.includes("dashboard")){
            return true;
        }
        return false;
    }
}