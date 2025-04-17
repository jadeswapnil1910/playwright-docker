import { test, expect, Page } from "@playwright/test";
import fs from "fs";

test("Dwonload File", async ( { page } ) => {

    await page.goto("https://demo.automationtesting.in/FileDownload.html");

    await page.locator('#textbox').pressSequentially('Test Data for Download');
    await page.locator('#createTxt').click();
    
    const [dwd] = await Promise.all(
        [
            page.waitForEvent('download'),
            page.locator('#link-to-download').click()
        ]
    );

    if (!fs.existsSync('downloads')) {
        fs.mkdirSync('downloads');
    }

    await dwd.saveAs('downloads/' + dwd.suggestedFilename());

    

});