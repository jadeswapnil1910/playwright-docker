import {test, expect, Page} from "@playwright/test";


test("Take Screenshot ", async({page}) =>{

    // page = await browser.newPage();
    await page.goto("https://www.saucedemo.com/v1/index.html");
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.screenshot({ path: `./src/screenshots/loginPage_${Math.floor(Math.random() * 10000)}.png` });
    await page.locator('#login-button1').click();
    await page.waitForTimeout(4000);
    await page.screenshot({ path: `./src/screenshots/homePage_${Math.floor(Math.random() * 10000)}.png` });
} )