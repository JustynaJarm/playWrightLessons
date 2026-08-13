import { test, expect } from '@playwright/test';

test.only('Client App', async ({ page }) => {
    const productName = 'ZARA COAT 3';
    const products = page.locator('.card-body');
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill('anshika@gmail.com');
    await page.locator('#userPassword').fill('Iamking@000');
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await page.locator('.card-body').first().waitFor();
    const titles = await page.locator('.card-body b').allTextContents();
    console.log(titles);
    const count = await products.count();

    for (let i = 0; i < count; ++i) {
        const raw = await products.nth(i).locator('b').textContent();
        const title = raw ? raw.trim().toLowerCase() : '';
        console.log(`product[${i}] = "${title}"`);
        if (title.includes(productName.toLowerCase())) {
            const addBtn = products.nth(i).locator('button:has-text("Add To Cart")');
            if (await addBtn.count() > 0) {
                await addBtn.scrollIntoViewIfNeeded();
                await addBtn.waitFor({ state: 'visible' });
                await addBtn.click();
            } else {
                const alt = products.nth(i).locator('text=Add To Cart');
                await alt.click();
            }
            break;
        }
    }

    await page.locator("[routerlink*='cart']").click();
    await page.locator('div li').first().waitFor();
    const bool = page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();

   
    // Zara coat 4
});