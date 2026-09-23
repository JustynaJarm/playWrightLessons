import {test, expect} from '@playwright/test';
test.only('Event Hub Test', async ({page})=> {

    await page.goto("https://eventhub.rahulshettyacademy.com/login");
    await page.getByRole('textbox', { name: 'Email' }).fill('jjtest@test.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('Test@123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page.locator('h1')).toContainText('Discover & BookAmazing Events');
    await page.getByRole('article').filter({ hasText: 'FestivalFeaturedDilli Diwali' }).getByTestId('book-now-btn').click();
    await expect(page.getByRole('main')).toContainText('Celebrate the Festival of Lights at the grandest Diwali Mela in North India. Enjoy 200+ stalls of artisanal crafts, street food, folk performances, fireworks, and cultural showcases spanning three vibrant evenings.');
    await page.waitForTimeout(2000);
    await page.getByRole('textbox', { name: 'Full Name*' }).fill('Test User');
    await page.getByTestId('customer-email').fill('aaaa@a.pl');
    await page.getByRole('textbox', { name: 'Phone Number*' }).fill('9234567890');
    await page.getByRole('button', { name: 'Confirm Booking' }).click();
    await expect(page.getByRole('button', { name: 'View My Bookings' })).toBeVisible();
    await page.getByRole('button', { name: 'View My Bookings' }).click();
    await page.waitForTimeout(2000);
    await expect(page.getByTestId('booking-card')).toBeVisible();






    await page.pause();


});

