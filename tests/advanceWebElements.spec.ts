import { test, expect, Locator, Page} from "@playwright/test";

test.use({ viewport: { width: 1440, height: 720 } });
test("Handling WebTable", async ({ page }) => {

    
    await page.goto("https://testautomationpractice.blogspot.com/#");
    const table = page.locator('table[name="BookTable"]');

    // Numebr of Rows and Columns
    const rows = table.locator('tbody tr');
    const columns = rows.locator('th');

    await page.waitForTimeout(1000);
    console.log(await rows.count());
    console.log(await columns.count());
    
    expect(await rows.count()).toBe(7);
    expect(await columns.count()).toBe(4);

    await page.close();

});


test("Selecting Single Check Box in webtable", async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/#");
    const table = page.locator('table#productTable');

    const getLaptopRow = table.locator('tbody tr').filter({ hasText: 'Laptop'});

    await getLaptopRow.locator('td input[type="checkbox"]').check();
    await page.waitForTimeout(2000);
    await expect (getLaptopRow.locator('td input[type="checkbox"]')).toBeChecked();

    await page.close();

});

test("Selecting multiple checkbox using function in WebTable", async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/#");
    const rows = page.locator('table#productTable').locator('tbody tr');
    await selectCheckbox(rows, page, 'Smartphone');
    await selectCheckbox(rows, page, 'Laptop');
    await selectCheckbox(rows, page, 'Tablet');
    await selectCheckbox(rows, page, 'Smartwatch');

    // await page.close();

});

async function selectCheckbox(rows: Locator, page: Page, productName: string) {

    const row = rows.filter(
        { 
            has : page.locator('td'),
            hasText : productName
        }
    )
    await row.locator('input').check();
    await page.waitForTimeout(1500);
}

test("Navigate to all Pages of WebTable", async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/#");

    const table = page.locator('table#productTable');
    const pages = page.locator('ul#pagination li');

    console.log(`Total number of pages in Webtable --> ${await pages.count()}`);

    // Iterate through all pages and their rows and product names and check the checkboxes.
    for (let i = 0; i < await pages.count(); i++) {
        console.log(`Navigating to page ${i + 1}`);
        const pg = pages.nth(i);
        await pg.locator('a').click();
        await page.waitForTimeout(1000);

        const rows = table.locator('tbody tr');
        const productName = rows.locator('td:nth-child(2)');
        const checkboxes = rows.locator('td input[type="checkbox"]');

        for(let j = 0; j < await productName.count(); j++) {
            await page.waitForTimeout(500);
            let prod = await productName.nth(j).textContent();
            console.log(`   Product Name: ${prod}`);
            await checkboxes.nth(j).check();
            console.log(`       Checkbox Checked: ${await checkboxes.nth(j).isChecked()}`);
        }
    }
    await page.close();
});



test("Single Tab handling", async ( { page } ) => {

    await page.goto("https://demo.automationtesting.in/Windows.html");
    console.log(`Window Name --> ${await page.title()}`);
    await page.locator('ul.nav-tabs > li:nth-child(1) > a').click();

    const [newTab] = await Promise.all(
        [
            page.waitForEvent('popup'),
            await page.getByRole("button", { name: 'click' }).click()
        ]
    );

    await newTab.waitForLoadState();
    console.log(`Window Name --> ${await newTab.title()}`);
    await newTab.locator('#navbarDropdown').click();
    await newTab.waitForTimeout(1500);
    await newTab.close();

    console.log(`Window Name --> ${await page.title()}`);
    await page.close();
});

test("Single Window handling", async ( { page } ) => {

    await page.goto("https://demo.automationtesting.in/Windows.html");
    console.log(`Window Name --> ${await page.title()}`);
    await page.locator('ul.nav-tabs > li:nth-child(2) > a').click();
    const [newWin] = await Promise.all(
        [
            page.waitForEvent('popup'),
            await page.getByRole("button", { name: 'click' }).click()
        ]
    );

    await newWin.waitForLoadState();
    console.log(`Window Name --> ${await newWin.title()}`);
    await newWin.locator('#navbarDropdown').click();
    await newWin.waitForTimeout(1500);
    await newWin.close();

    console.log(`Window Name --> ${await page.title()}`);
    await page.close();
});


test("Multiple Tab handling", async ({ page }) => {

    await page.goto("https://demo.automationtesting.in/Windows.html");
    console.log(`Window Name --> ${await page.title()}`);
    await page.locator('ul.nav-tabs > li:nth-child(3) > a').click();

    const [multiTabs] = await Promise.all(
        [
            page.waitForEvent('popup'),
            await page.getByRole("button", { name: 'click' }).click()
        ]
    );

await multiTabs.waitForLoadState();

await multiTabs.waitForTimeout(5000);

const pages = await multiTabs.context().pages();
console.log(`Number of Tabs / pages opened --> ${pages.length}`);


if (pages.length > 2) {

    console.log(`Name of Page 1 --> ${await pages[1].title()}`);
    await pages[1].locator('text=Skip Sign In').click();

    console.log(`Name of Page 2 --> ${await pages[2].title()}`);
    await pages[2].locator('#navbarDropdown').click();
    await pages[2].waitForTimeout(2000);
}

for (let i = 1; i < pages.length; i++) {
    await pages[i].close();
}
    await page.close();
});



test("", async ({ page }) => {

    await page.goto("https://demo.automationtesting.in/Windows.html");
    console.log(`Window Name --> ${await page.title()}`);
    await page.locator('ul.nav-tabs > li:nth-child(3) > a').click();

    

    const [tabs] = await Promise.all(
        [
            page.waitForEvent('popup'),
            await page.locator('button[onclick="multiwindow()"]').click(),
        ]
    )

    await tabs.waitForLoadState();
    await tabs.waitForTimeout(2000);

    const pages = tabs.context().pages();
    console.log("Total Number of pages --> " + pages.length);

    await pages[1].waitForLoadState('domcontentloaded');
    console.log("Tab1 Title --> " + await pages[1].title());

    await pages[2].waitForLoadState('domcontentloaded');
    console.log("Tab1 Title --> " + await pages[2].title());
    await pages[2].locator('#navbarDropdown').click();
    await pages[2].locator('text=About Selenium').nth(0).click({ timeout: 5000 });

    await pages[1].waitForTimeout(2000);

    await pages[1].close();
    await pages[2].waitForTimeout(2000);
    await pages[2].close();

    // if (pages.length > 1) {

        
    // }
    // else {
    //     console.log("Failed to open Pages");
        
    // }

    await page.close();
    



});