import { Locator, Page, expect } from "@playwright/test";

export class HomePage {

    private readonly page:      Page;
    private readonly products:  Locator;
    private readonly cartIcon:  Locator;
    private readonly cartPage:  Locator;


    constructor(pg: Page) {

        this.page       = pg;
        this.products   = this.page.locator('.inventory_item');
        this.cartIcon   = this.page.locator('#shopping_cart_container a');
        this.cartPage   = this.page.locator('text=Your Cart');
    }

    async getTotalProductCount(){

        console.log(`Total items : ${await this.products.count()}`);
    }

    async getProductPrice(productName: string) {

        const bag = this.products.filter({ hasText: productName });
        const price = await bag.locator('.inventory_item_price').textContent();
        console.log(`${productName} Price --> ${price}`);
    }

    async addproductToCart(productName: string) {

        const bag = this.products.filter({ hasText: productName });
        await bag.getByRole('button', { name: 'ADD TO CART' }).click();
    
        const CartItems = await this.cartIcon.locator('span').textContent();
        console.log(`Total Cart Items : ${CartItems}`);
        await this.page.waitForTimeout(500);
        await this.cartIcon.click();
        await this.page.waitForLoadState();
        await expect(this.cartPage).toBeVisible();
    }

    async logOutApp() {

        await this.page.locator('text=Open Menu').click();
        await this.page.locator('#logout_sidebar_link').click();
        await this.page.close();
    }


}