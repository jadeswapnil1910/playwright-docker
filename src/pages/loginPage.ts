import { Locator, Page } from "@playwright/test";

export class LoginPage{

    private readonly page:          Page;
    private readonly usernameBox:   Locator;
    private readonly passwordBox:   Locator;
    private readonly loginBtn:      Locator;

    constructor(pg: Page) 
    {
        this.page           = pg;
        this.usernameBox    = this.page.locator('#user-name');
        this.passwordBox    = this.page.locator('#password');
        this.loginBtn       = this.page.locator('#login-button');
    }

    async navigateToLoginPage() {

        await this.page.goto("https://www.saucedemo.com/v1/index.html");
    }

    async enterCredencials(usrid: string, pwd: string) {

        await this.usernameBox.fill(usrid);
        await this.passwordBox.fill(pwd);
    }

    async clickLoginBtn() {

        await this.loginBtn.click();
        await this.page.waitForLoadState();
    }

}