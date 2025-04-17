import { test, expect} from "../fixtures/pomFixtures";
import { Page } from "@playwright/test"


// let page: Page;

test.beforeEach( async({loginpage}) =>{

    // page = await browser.newPage();
    await loginpage.navigateToLoginPage();
});

test.afterEach( async ({homepage}) => {
    
    await homepage.logOutApp();
});

test("Sauce Lab Application End to End Flow @fixture", async ({loginpage, homepage, checkoutpage}) => {

    
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

        await checkoutpage.clickOnCheckOutBtn();
        await checkoutpage.validateErrorMsg();
        await checkoutpage.continueToCheckout();
    });

});