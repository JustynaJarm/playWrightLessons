import { test, expect, request } from '@playwright/test';
import { APiUtils } from './utils/APiUtils.js';
const loginPayLoad = {userEmail:"anshika@gmail.com",userPassword:"Iamking@000"};
const orderPayLoad = {orders:[{country:"Cuba",productOrderedId:"6960eae1c941646b7a8b3ed3"}]};
const fakePayLoadOrders = {data:[],message:"No Orders"};
 
 
let response;
test.beforeAll( async()=>
{
   const apiContext = await request.newContext();
   const apiUtils = new APiUtils(apiContext,loginPayLoad);
   response =  await apiUtils.createOrder(orderPayLoad);
 
})
 
 
//create order is success
test('@API Place the order', async ({page})=>
{ 
    await page.addInitScript(value => {
 
        window.localStorage.setItem('token',value);
    }, response.token );
await page.route("**/api/ecom/order/get-orders-for-customer/**", 
    async route =>
    {
        await route.fulfill({ json: fakePayLoadOrders });
    });

await page.goto("https://rahulshettyacademy.com/client");
const ordersResponsePromise = page.waitForResponse(response =>
    response.url().includes("/api/ecom/order/get-orders-for-customer/")
);
 await page.locator("button[routerlink*='myorders']").click();
const ordersResponse = await ordersResponsePromise;
expect(await ordersResponse.json()).toEqual(fakePayLoadOrders);
await expect(page.locator("tbody tr")).toHaveCount(0);
 


});
 
