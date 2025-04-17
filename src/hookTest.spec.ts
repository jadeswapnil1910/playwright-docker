import {test, expect, Page} from "@playwright/test";

let page;

test.beforeEach( async({browser}) =>{

    page = await browser.newPage();
    await page.goto("https://www.saucedemo.com/v1/index.html");
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
} )

test.afterEach( async()=> {

    await page.locator('text=Open Menu').click();
    await page.locator('#logout_sidebar_link').click();
    await page.close();
})



test("Add Items and Check Out test", async ({}) => {

    // await page.goto("https://www.saucedemo.com/v1/index.html");
    // await page.locator('#user-name').fill('standard_user');
    // await page.locator('#password').fill('secret_sauce');
    // await page.locator('#login-button').click();

    const items = page.locator('.inventory_item');

    console.log(`Total items : ${await items.count()}`);

    const bag = await items.filter({ hasText: 'Sauce Labs Backpack' });
    const price = await bag.locator('.inventory_item_price').textContent();
    console.log(`Bag Price : ${price}`);
    console.log("Add To Cart");

    await bag.getByRole('button', { name: 'ADD TO CART' }).click();

    const CartItems = await page.locator('#shopping_cart_container a').locator('span').textContent();
    console.log(`Total Cart Items : ${CartItems}`);
    await page.waitForTimeout(500);
    await page.locator('#shopping_cart_container a').click();

    await page.waitForLoadState();
    await expect(page.locator('text=Your Cart')).toBeVisible();

    await page.locator('text=CHECKOUT').click();
    await page.waitForLoadState();

    await page.locator('input[value="CONTINUE"]').click();

    await expect(page.locator('h3[data-test="error"]')).toBeVisible();

    console.log(await page.locator('h3[data-test="error"]').textContent());


    await page.locator('#first-name').fill('Name');
    await page.locator('#last-name').fill('Last Name');
    await page.locator('#postal-code').fill('123456');
    await page.waitForTimeout(500);
    await page.locator('input[value="CONTINUE"]').click();

    await page.waitForLoadState();
    await page.locator('text=FINISH').click();

    console.log(await page.locator('.complete-header').textContent());

    // await page.locator('text=Open Menu').click();
    // await page.locator('#logout_sidebar_link').click();
    // await page.close();
});


test("Add Items and remove from Cart test", async ({}) => {

    // await page.goto("https://www.saucedemo.com/v1/index.html");
    // await page.locator('#user-name').fill('standard_user');
    // await page.locator('#password').fill('secret_sauce');
    // await page.locator('#login-button').click();

    const items = page.locator('.inventory_item');

    console.log(`Total items : ${await items.count()}`);

    const bag = await items.filter({ hasText: 'Sauce Labs Bike Light' });
    const price = await bag.locator('.inventory_item_price').textContent();
    console.log(`Bag Price : ${price}`);
    console.log("Add To Cart");

    await bag.getByRole('button', { name: 'ADD TO CART' }).click();

    const CartItems = await page.locator('#shopping_cart_container a').locator('span').textContent();
    console.log(`Total Cart Items : ${CartItems}`);
    await page.waitForTimeout(500);
    await page.locator('#shopping_cart_container a').click();

    await page.waitForLoadState();
    await expect(page.locator('text=Your Cart')).toBeVisible();

    console.log(`Cart Items ${await page.locator('.cart_item').count()}`);
    expect(await page.locator('.cart_item').count()).toBeGreaterThanOrEqual(1);
    await page.locator('text=REMOVE').click();
    await page.waitForLoadState();

    // await page.locator('text=Open Menu').click();
    // await page.locator('#logout_sidebar_link').click();
    // await page.close();
});