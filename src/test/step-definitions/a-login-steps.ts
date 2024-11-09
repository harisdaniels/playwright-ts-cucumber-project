import { expect } from "@playwright/test";
import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { fixture } from "../../hooks/page-fixture";
import LoginPage from "../../pages/login-page";
import HeaderPage from "../../pages/header-page"; 

setDefaultTimeout(60 * 1000);

let header: HeaderPage;
let login: LoginPage;

Given('user navigates to the login page', async function () {
  header = new HeaderPage(fixture.page);
  login = new LoginPage(fixture.page);
  
  login.navigateToLoginPage();
});

When('user enter the username as {string}', async function (username) {
  await login.enterUserName(username);
});

When('user enter the password as {string}', async function (password) {
  await login.enterPassword(password);
});

When('user click on the login button', async function () {
  await login.clickLoginButton();
  await fixture.page.waitForLoadState();
  await fixture.page.waitForTimeout(2000);
});

Then('login should be success', async function () {
  await fixture.page.waitForLoadState();
  await fixture.page.waitForTimeout(2000);
  await header.getNameLinkText();
});

When('login should fail', async function () {
  await expect(login.getErrorMessage()).toBeVisible();
});