import { Locator, Page, expect } from "@playwright/test";

export class CheckoutPage {

    private readonly page:          Page;
    private readonly checkoutBtn:   Locator;
    private readonly firstName:     Locator;
    private readonly lastName:      Locator;
    private readonly pinCode:       Locator;
    private readonly continueBtn:   Locator;
    private readonly errorText:     Locator;
    private readonly finishBtn:     Locator;
    private readonly completeMsg:   Locator;



    constructor( pg: Page) {

        this.page           = pg;
        this.checkoutBtn    = this.page.locator('text=CHECKOUT');
        this.firstName      = this.page.locator('#first-name')
        this.lastName       = this.page.locator('#last-name');
        this.pinCode        = this.page.locator('#postal-code');
        this.continueBtn    = this.page.locator('input[value="CONTINUE"]');
        this.errorText      = this.page.locator('h3[data-test="error"]');
        this.finishBtn      = this.page.locator('text=FINISH');
        this.completeMsg    = this.page.locator('.complete-header');
    }

    async clickOnCheckOutBtn() {

        await this.checkoutBtn.click();
        await this.page.waitForLoadState();
    }

    async validateErrorMsg() {

        await this.continueBtn.click();
        await expect(this.errorText).toBeVisible();
        console.log(await this.errorText.textContent());
    }

    async continueToCheckout() {

        await this.firstName.fill('Name');
        await this.lastName.fill('Last Name');
        await this.pinCode.fill('123456');
        await this.page.waitForTimeout(500);
        await this.continueBtn.click();
        await this.page.waitForLoadState();
        await this.finishBtn.click();
        console.log(await this.completeMsg.textContent());
    }
}