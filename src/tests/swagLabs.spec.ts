import {test, expect, Page} from "@playwright/test";
import { PageObjectManager } from "../pages/PageObjectManager";

let page: Page;
let pom: PageObjectManager;

test.beforeEach( async({browser}) =>{

    page = await browser.newPage();
    pom = new PageObjectManager(page);
    await pom.getLoginPage().navigateToLoginPage();
});

test.afterEach( async () => {
    
    await pom.getHomePage().logOutApp();
});

test("Sauce Lab Appliaction End to End Flow @pom", async () => {

    const loginpage = pom.getLoginPage();
    const homepage = pom.getHomePage();
    const checkoupage = pom.getCheckOutPage();

    await test.step('Login to Sauce Labs Appliaction', async ()=> {

        await loginpage.enterCredencials("standard_user", "secret_sauce");
        await loginpage.clickLoginBtn();
    });

    await test.step('Add product to Cart', async ()=> {

        await homepage.getTotalProductCount();
        await homepage.getProductPrice('Sauce Labs Backpack');
        await homepage.addproductToCart('Sauce Labs Backpack');
    });


    await test.step('Checkout Items', async () => {

        await checkoupage.clickOnCheckOutBtn();
        await checkoupage.validateErrorMsg();
        await checkoupage.continueToCheckout();
    });

});