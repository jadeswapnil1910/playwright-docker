import {test, expect, Page} from "@playwright/test";

const creds = [
    {
        "username" : "standard_user",
        "pwd" : "secret_sauce"
    },
    {
        "username" : "locked_out_user",
        "pwd" : "secret_sauce"
    },
    {
        "username" : "problem_user",
        "pwd" : "secret_sauce"
    },
]


creds.forEach(data=> {

    test(`Login with ${data.username} : ${data.pwd}`, async({page}) =>{

        await page.goto("https://www.saucedemo.com/v1/index.html");
        await page.locator('#user-name').fill(data.username);
        await page.locator('#password').fill(data.pwd);
        await page.waitForTimeout(2000);
        // await page.screenshot({ path: `./src/screenshots/loginPage_${Math.floor(Math.random() * 10000)}.png` });
        await page.locator('#login-button').click();
        await page.waitForTimeout(2000);
        // await page.screenshot({ path: `./src/screenshots/homePage_${Math.floor(Math.random() * 10000)}.png` });
        await page.close();
    });

});