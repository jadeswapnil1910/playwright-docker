import { test as baseTest } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { HomePage } from "../pages/homePage";
import { CheckoutPage } from "../pages/checkoutPage";

type pages = {

    loginpage: LoginPage,
    homepage: HomePage,
    checkoutpage: CheckoutPage
}


const testPages = baseTest.extend<pages>( {

    loginpage: async({page}, use) => {
        await use(new LoginPage(page));
    },

    homepage: async({page}, use) => {

        await use(new HomePage(page));
    },

    checkoutpage: async({page},use)=> {

        await use(new CheckoutPage(page));
    }
});


export const test = testPages;
export const expect = testPages.expect;