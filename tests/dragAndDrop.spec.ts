import { test, expect, Page } from "@playwright/test";


test("Drag And Drop @1", async ({ page }) => {

    await page.goto("http://www.dhtmlgoodies.com/scripts/drag-drop-custom/demo-drag-drop-3.html");

    const src = page.locator('//div[@id="box5"][text()="Seoul"]');
    const trg = page.locator('//div[@id="box105"][text()="South Korea"]');

    await src.hover();
    await page.mouse.down();
    await trg.hover();
    await page.mouse.up();

    const element = trg.locator('text=Seoul');

    expect(await element.isVisible()).toBeTruthy();

    if(await element.isVisible()) {
         console.log("PASS");
    }

    // Get computed CSS values from browser context
    async function getStyles(el: Element) {
        const computed = window.getComputedStyle(el);
        return {
            backgroundColor: computed.backgroundColor,
        };
    }

    const styles = await element.evaluate(getStyles);
    console.log(styles.backgroundColor);

    await page.close();

});

test("Drag And Drop @2", async ( {page} ) => {

    await page.goto("http://www.dhtmlgoodies.com/scripts/drag-drop-custom/demo-drag-drop-3.html");

    const src = page.locator('//div[@id="box5"][text()="Seoul"]');
    const trg = page.locator('//div[@id="box105"][text()="South Korea"]');

    await src.dragTo(trg);

});