import {test, expect} from '@playwright/test';
test('Playwright special locators', async ({page})=> {

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel('Check me out if you Love IceCreams!').click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("123456");
    await page.getByRole("button", {name: "Submit"}).click();
    await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout: 10000});


    await expect(page.getByText("Success! The Form has been submitted successfully!.")).isVisible();

    await page.getByRole("link", {name: "Shop"}).click();
    await page.locator("app-card").filter({hasText: "Nokia Edge"}).getByRole("button", {name: "Add"}).click();
    
});

test('Playwright test level time out', async ({page})=> {

    test.setTimeout(10000);
    page.setDefaultTimeout(10000)
    const slowExpect =expect.configure({timeout: 9000});
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel('Check me out if you Love IceCreams!').click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("123456");
    await page.getByRole("button", {name: "Submit"}).click();
    await slowExpect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible();


    await expect(page.getByText("Success! The Form has been submitted successfully!.")).isVisible();

    await page.getByRole("link", {name: "Shop"}).click();
    expect(page.locator(".my-4").first()).toHaveText("Shop");

    await page.locator("app-card").filter({hasText: "Nokia Edge"}).getByRole("button", {name: "Add"}).click();
    
});