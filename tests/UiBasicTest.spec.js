import { test, expect } from '@playwright/test';
// test('@Child windows hadl', async ({browser})=>
//  {
//     const context = await browser.newContext();
//     const page =  await context.newPage();
//     const userName = page.locator('#username');
//     await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
//     const documentLink = page.locator("[href*='documents-request']");
 
//     const [newPage]=await Promise.all(
//    [
//       context.waitForEvent('page'),//listen for any new page pending,rejected,fulfilled
//       documentLink.click(),
   
//    ])//new page is opened
   
 
//    const  text = await newPage.locator(".red").textContent();
//     const arrayText = text.split("@")
//     const domain =  arrayText[1].split(" ")[0]
//     //console.log(domain);
//     await page.locator("#username").fill(domain);
//     console.log(await page.locator("#username").inputValue());
 
//  })

//  test.only('UI Controls', async ({page})=>
//  {
//    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
//    const userName = page.locator('#username');
//    const signIn = page.locator('#signInBtn');
//    const dropdown = page.locator("select.form-control");
//    await dropdown.selectOption('consult');
//    await page.locator('.radiotextsty').last().click();
//    await page.locator('#okayBtn').click();
//    await userName.type("rahulshettyacademy");
//    await page.locator('#password').type("learning");
//    await signIn.click();
//    console.log(await page.locator("[style*='block']").textContent());
//    await expect(page.locator("[style*='block']")).toContainText('Incorrect'); 
//    console.log(expect(page.locator(".radiotextsty").last()).isChecked());
//    await expect(page.locator(".radiotextsty").last()).toBeChecked();
//    await page.pause();
//  });

 test ('UI Controls', async ({page})=>
 {
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   const userName = page.locator('#username');
   const signIn = page.locator('#signInBtn');
   const dropdown = page.locator("select.form-control");
   const documentLink = page.locator("[href*='documents-request']");
   await dropdown.selectOption('consult');
   await page.locator('.radiotextsty').last().click();
   await page.locator('#okayBtn').click();
   console.log(await page.locator('.radiotextsty').last().isChecked());
   await expect(page.locator('.radiotextsty').last()).toBeChecked();
   await page.locator("#terms").uncheck();
   expect(await page.locator("#terms").isChecked()).toBeFalsy();
   await expect(documentLink).toHaveAttribute('class','blinkingText');
   await page.waitForTimeout(3000);
   await page.pause();
 }); 

  test.only('Child windows handle', async ({browser})=>
 {
   const context = await browser.newContext();
   const page =  await context.newPage();
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   const documentLink = page.locator('a.blinkingText[href="https://rahulshettyacademy.com/documents-request"]');

   const [newPage] = await Promise.all([
   context.waitForEvent('page'),
   documentLink.click(),
   ])
  
   await newPage.waitForLoadState();
   const text = await newPage.locator(".red").textContent();
   console.log(text);

 }); 