import { expect } from "@playwright/test";
import test from "../Lambda101_setup";
 // import test from '@playwright/test'
 

test.describe("Playwright Assignment Test Scenarios", async () => {
  test.beforeEach(async ({ page }) => {
    test.step("Launch Application ", async () => {
      await page.goto(User_Data.URL);
      await page.waitForLoadState("domcontentloaded");
    });
  });

  test("Test Scenario 1", async ({ page }) => {
    await page.getByRole("link", { name: "Simple Form Demo" }).click();
    await page.getByPlaceholder("Please enter your Message").fill(User_Data.WELCOME_MSG);
    await page.getByRole("button", { name: "Get Checked Value" }).click();
    await expect(page.locator("#message")).toHaveText(User_Data.WELCOME_MSG);
  });

  test("Test Scenario 2", async ({ page }) => {
    await page.getByRole("link", { name: "Drag & Drop Sliders" }).click();
    await page.waitForSelector("#slider3");
    let defaultValTxt = await page.locator("#rangeSuccess").innerText();
    expect(defaultValTxt).toBe("15");
    await page.locator("#slider3").getByRole("slider").fill("95");
    let afterValTxt = await page.locator("#rangeSuccess").innerText();
    expect(afterValTxt).toBe("95");
  });

  test("Test Scenario 3", async ({ page }) => {
    await page.getByRole("link", { name: "Input Form Submit" }).click();
    await page.getByRole("button", { name: "Submit" }).click();
    await page.getByPlaceholder("Name", { exact: true }).fill(User_Data.USER_NAME);
    await page.getByPlaceholder("Email", { exact: true }).fill(User_Data.EMAIL);
    await page.getByPlaceholder("Password").fill(User_Data.PASSWORD);
    await page.getByPlaceholder("Company").fill(User_Data.COMPANY);
    await page.getByPlaceholder("Website").fill(User_Data.WEBSITE);
    await page.getByRole("combobox").selectOption(User_Data.COUNTRY);
    await page.getByPlaceholder("City").fill(User_Data.CITY);
    await page.getByPlaceholder("Address 1").fill(User_Data.ADDRESS1);
    await page.getByPlaceholder("Address 2").fill(User_Data.ADDRESS2);
    await page.getByPlaceholder("State").fill(User_Data.STATE);
    await page.getByPlaceholder("Zip code").fill(User_Data.ZIP);
    await page.getByRole("button", { name: "Submit" }).click();
    await page.waitForTimeout(2000);
    const successMessage = await page
      .locator('//*[contains(@class,"loginform")]//p')
      .textContent();
    expect(successMessage).toBe(User_Data.SUCCESS_MSG);
  });
});
const User_Data = {
  URL: "https://www.lambdatest.com/selenium-playground/",
  WELCOME_MSG: "Welcome to the LambdaTest",
  USER_NAME: "anil",
  EMAIL: "anil@gmail.com",
  PASSWORD: "anil@123",
  COMPANY: "apple",
  WEBSITE: "www.anil.com",
  COUNTRY: "United States",
  CITY: "Ohio",
  ADDRESS1: "My Street",
  ADDRESS2: "Kingston",
  STATE: "New York",
  ZIP: "12401",
  SUCCESS_MSG: "Thanks for contacting us, we will get back to you shortly.",
};



