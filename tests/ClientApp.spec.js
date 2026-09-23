import { test, expect } from '@playwright/test';

test ('Client App', async ({ page }) => {
    const email = 'jarmuljustyna@gmail.com';
    const productName = 'ZARA COAT 3';
    const products = page.locator('.card-body');
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill(email);
    await page.locator('#userPassword').fill('Playwright123!');
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');

    // wait for product cards to appear (login may redirect)
    await expect(products.first()).toBeVisible({ timeout: 30000 });

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
    await expect(page.locator('div li').first()).toBeVisible({ timeout: 10000 });

    await expect(page.locator("h3:has-text('ZARA COAT 3')")).toBeVisible();

    await page.locator('text=Checkout').click();

    // type country and select from dropdown
    const countryInput = page.locator("[placeholder*='Select Country']");
    await countryInput.type('India', { delay: 100 });

    const dropdown = page.locator('.ta-results');
    await expect(dropdown).toBeVisible({ timeout: 10000 });
    const optionsCount = await dropdown.locator('button').count();
    for (let i = 0; i < optionsCount; ++i) {
       const text = (await dropdown.locator('button').nth(i).textContent()) || '';
       if (text.trim() === 'India') {
          await dropdown.locator('button').nth(i).click();
          break;
       }
    }

        // assert shipping email value
        await expect(page.locator(".user__name input[type='text']").first()).toHaveValue(email);
        await page.locator('.action__submit').click();

        
    await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');
    const rawOrderText = (await page.locator('.em-spacer-1 .ng-star-inserted').textContent()) || '';
    const match = rawOrderText.match(/([A-Za-z0-9-]{6,})/);
    const orderId = match ? match[1].trim() : rawOrderText.trim();
    console.log('orderId=', orderId);

    await page.locator('button[routerlink*="myorders"]').click();
    await page.waitForSelector('table', { timeout: 30000 });
    await expect(page.locator('table')).toContainText(orderId, { timeout: 30000 });
});