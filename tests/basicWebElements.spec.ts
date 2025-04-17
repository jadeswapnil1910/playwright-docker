import { expect, test } from '@playwright/test';

test("Login to Orange HRM Page", async( { page}) => {

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await page.getByRole( 'textbox', {name: "Username"}).pressSequentially("Admin", { delay : 500});
    await page.getByRole( 'textbox', {name: "Password"}).pressSequentially("admin123", { delay : 500});
    await page.getByRole( 'button', { name: 'Login' } ).press('Enter');
    await page.close();
});


test("Regular Button Click", async( { page}) => {

    await page.goto("https://play1.automationcamp.ir/mouse_events.html");
    await page.locator('#click_area').click();
    await page.close();
});

test("Duble Click", async( { page}) => {

    await page.goto("https://play1.automationcamp.ir/mouse_events.html");
    await page.locator('#click_area').dblclick();
    await page.close();
});

test("Right Click", async( { page}) => {

    await page.goto("https://play1.automationcamp.ir/mouse_events.html");
    // await page.locator('#click_area').click({ button: 'left'});
    // await page.locator('#click_area').click({ button: 'middle'});
    await page.locator('#click_area').click({ button: 'right'});
    await page.close();
});

test("Check Box", async( { page}) => {

    await page.goto("https://demo.automationtesting.in/Register.html");

    const cricketCheckBox = page.locator('#checkbox1');
    const moviesCheckBox = page.locator('#checkbox2');
    const hockeyCheckBox = page.locator('#checkbox3');

    await cricketCheckBox.check();
    await page.waitForTimeout(1500);
    expect(cricketCheckBox).toBeChecked();
    await cricketCheckBox.uncheck();
    expect(cricketCheckBox).not.toBeChecked();
    await page.waitForTimeout(1500);    
    await moviesCheckBox.check();
    expect(moviesCheckBox).toBeChecked();
    await page.waitForTimeout(1500);
    await moviesCheckBox.uncheck();
    expect(moviesCheckBox).not.toBeChecked();
    await page.waitForTimeout(1500);
    await hockeyCheckBox.check();
    expect(hockeyCheckBox).toBeChecked();
    await page.waitForTimeout(1500);
    await hockeyCheckBox.uncheck();
    expect(hockeyCheckBox).not.toBeChecked();

    await page.close();
    
});


test("Single Static Dropdown", async( { page}) => {

    await page.goto("https://demo.automationtesting.in/Register.html");

    await page.selectOption('#Skills', 
        {
            label: 'C++',
        });
        
    await page.waitForTimeout(1500);
    await page.selectOption('#Skills', 
        {
            label: 'PHP',
        });
    
    await page.waitForTimeout(1500);
    await page.selectOption('#Skills', 
        {
            label: 'SQL',
        });
    
    await page.close();
});


test("Multi Select Static Dropdown", async( { page}) => {

    await page.goto("https://demoqa.com/select-menu");

    await page.selectOption('#cars', [
        // { label: 'Volvo' },
        { label: 'Saab' },
        { label: 'Opel' },
        // { label: 'Audi' },
    ]);
    await page.close();
});

test("Dynamic Dropdown", async( { page}) => {

    await page.goto("https://demo.automationtesting.in/Register.html");

    await page.locator('span[role="combobox"]').click();

    await page.locator('.select2-search__field').pressSequentially('I');

    const result = page.locator('.select2-results li');

    for (let i = 0; i < await result.count(); i++) {
        const text = await result.nth(i).textContent();
        console.log(text);
        if (text === 'India') {
            await result.nth(i).click();
            break;
        }
    }

    await page.close();
});

test("Test Alerts", async( { page }) => {

    await page.goto("https://the-internet.herokuapp.com/javascript_alerts");

    page.on('dialog', async (alert1) => {
        const msg = alert1.message(); // Get the alert message
        console.log(`Alert message: ${msg}`); // Log the alert message
        await page.waitForTimeout(2000); 
        await alert1.dismiss(); // Dismiss the alert (click "Cancel")
        await expect(page.locator('#result')).toHaveText('You clicked: Cancel'); // Verify the result text after dismissing the alert
    });
    await page.locator("text=Click for JS Confirm").click();

    await page.waitForTimeout(1000);
    await page.close();

});

