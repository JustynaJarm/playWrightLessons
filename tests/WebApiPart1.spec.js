import { test, expect, request } from '@playwright/test';

const loginPayload = {
  userEmail: 'jarmuljustyna@gmail.com',
  userPassword: 'Playwright123!'
};

const orderPayLoad = {
  orders: [{ country: 'India', productOrderedId: '6960eac0c941646b7a8b3e68' }]
};

let orderId;
let token;

test.beforeAll(async () => {
  const apiContext = await request.newContext();

  const loginResponse = await apiContext.post(
    'https://rahulshettyacademy.com/api/ecom/auth/login',
    { data: loginPayload }
  );

  expect(loginResponse.ok()).toBeTruthy();

  const loginResponseJson = await loginResponse.json();
  token = loginResponseJson.token;

  const orderResponse = await apiContext.post(
    'https://rahulshettyacademy.com/api/ecom/order/create-order',
    {
      data: orderPayLoad,
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      }
    }
  );

  expect(orderResponse.ok()).toBeTruthy();

  const orderResponseJson = await orderResponse.json();
  orderId = orderResponseJson.orders[0];

  await apiContext.dispose();
});





test('Place the order', async ({ page }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem('token', value);
  }, token);

  await page.goto('https://rahulshettyacademy.com/client');
  await page.waitForLoadState('networkidle');

  await page.locator("button[routerlink*='myorders']").click();
  await expect(page.locator('tbody')).toBeVisible();

  const rows = page.locator('tbody tr');
  await expect(rows.first()).toBeVisible();
  await expect(page.locator('tbody')).toContainText(orderId);
});