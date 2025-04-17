import {test} from "@playwright/test";
import data from "../testData/readData.json";

const dataArray = Array.isArray(data) ? data : [data];

dataArray.forEach((Cred) => {
    test(`Login with ${Cred.username}: ${Cred.pwd}`, async ({ page }) => {
        await page.goto("https://www.saucedemo.com/v1/index.html");
        await page.locator('#user-name').fill(Cred.username);
        await page.locator('#password').fill(Cred.pwd);
        await page.waitForTimeout(2000);
        await page.locator('#login-button').click();
        await page.waitForTimeout(2000);
        // await page.screenshot({ path: `./src/screenshots/homePage_${Math.floor(Math.random() * 100000)}.png` });
        await page.close();
    });
});




