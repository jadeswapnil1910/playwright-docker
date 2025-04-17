import { Page } from "@playwright/test";
import { LoginPage } from "./loginPage";
import { HomePage } from "./homePage";
import { CheckoutPage } from "./checkoutPage";

export class PageObjectManager {

    private page: Page;
    private loginPage: LoginPage;
    private homePage: HomePage;
    private checkoutPage: CheckoutPage;

    constructor(page: Page) {
        this.page = page;
      }
        
    /*
        getLoginPage(): LoginPage { }
        This defines a method named getLoginPage.
        It returns an object of type LoginPage.
    */
    getLoginPage(): LoginPage {

      if(!this.loginPage) {
          this.loginPage = new LoginPage(this.page);
      }
      return this.loginPage;
    }

    getHomePage(): HomePage {

      if(!this.homePage) {
        this.homePage = new HomePage(this.page);
      }
      return this.homePage;
    }

    getCheckOutPage(): CheckoutPage {

      if(!this.checkoutPage) {
        this.checkoutPage = new CheckoutPage(this.page);
      }
      return this.checkoutPage;
    }
}

    