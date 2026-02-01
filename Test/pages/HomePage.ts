import {Page, Locator, expect} from '@playwright/test';

export class HomePage{
    readonly page: Page;
    readonly homeTitle: Locator;
    readonly burgerIcon: Locator;
    readonly cartIcon: Locator;
    readonly sortIcon: Locator;
    readonly burgerCross: Locator;
    readonly item: Locator;
    constructor (page: Page){
        this.page = page;
        this.homeTitle = page.locator('span[class="title"]');
        this.burgerIcon = page.locator('#react-burger-menu-btn');
        this.cartIcon = page.locator('a[class="shopping_cart_link"]');
        this.sortIcon = page.locator('select[class="product_sort_container"]');
        this.burgerCross = page.locator('button[id="react-burger-cross-btn"]');
        this.item = page.locator('div[class="inventory_item"]');
    }
    async verifyHomePage(){
        await expect(this.homeTitle).toHaveText('Products',{timeout:1000});
        await expect(this.burgerIcon).toBeVisible({timeout:1000});
        await expect(this.cartIcon).toBeVisible({timeout:1000});
        await expect(this.sortIcon).toBeVisible({timeout:1000});
    } 

    async clickBurgerIcon(){
        this.burgerIcon.click();
        await this.page.locator('.bm-menu-wrap').waitFor({ state: 'visible' });
    }
    async checkItems() {
        const items = this.page.locator(".bm-item.menu-item");
        const itemCount = await items.count();
        console.log(`Number of items in burger menu: ${itemCount}`);
        await expect(itemCount).toBe(6);
        for(let i = 0; i < itemCount; i++){
            await expect(items.nth(i)).toBeVisible();
        }
    }
    
    async closeBurgerMenu(){
        this.burgerCross.click();
    }
    async countItem(){
        const itemCount = await this.item.count();
        console.log(`Total items on Home Page: ${itemCount}`);

        await expect(itemCount).toBeGreaterThan(0);
    }
    async checkItemDetail() {
        const itemCount = await this.item.count();
        for(let i = 0; i < itemCount; i++){
            const imgItem = this.page.locator('img[class="inventory_item_img"]').nth(i);
            await expect(imgItem).toBeVisible();

            await expect(imgItem).not.toHaveJSProperty('naturalWidth', 0);

            const itemName = this.page.locator("div.inventory_item").nth(i);
            await expect(itemName).toBeVisible();

            const itemDesc = this.page.locator("div.inventory_item_desc").nth(i);
            await expect(itemDesc).toBeVisible();
            
            const itemPrice = this.page.locator("div.inventory_item_price").nth(i);
            await expect(itemPrice).toBeVisible();

            const addToCartBtn = this.page
            .locator('button.btn_primary.btn_small.btn_inventory')
            .nth(i);
            
            await expect(addToCartBtn).toBeVisible();
            
        }
    }
}