# This Is My Sample Project of Web Automation Testing Using Cypress and Cucumber

## Project Information
For this project, i use:
- Playwright (https://playwright.dev/)
- TypeScript (https://www.typescriptlang.org/)
- Cucumber(Js) (https://cucumber.io/docs/installation/javascript/)

### Playwright
Playwright Test was created specifically to accommodate the needs of end-to-end testing. Playwright supports all modern rendering engines including Chromium, WebKit, and Firefox. Test on Windows, Linux, and macOS, locally or on CI, headless or headed with native mobile emulation of Google Chrome for Android and Mobile Safari. 

### TypeScript
TypeScript is a language for application-scale JavaScript. TypeScript adds optional types to JavaScript that support tools for large-scale JavaScript applications for any browser, for any host, on any OS. TypeScript compiles to readable, standards-based JavaScript.

### Cucumber(JS)
Cucumber is a software tool that supports behavior-driven development. Central to the Cucumber BDD approach is its ordinary language parser called Gherkin. It allows expected software behaviors to be specified in a logical language that customers can understand.

## Preparation
- Clone from this repo https://github.com/harisdaniels/playwright-ts-cucumber-project.git. 
- The steps of cloning Github Repository, can be found [here](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository-from-github/cloning-a-repository).
- Or, you can download this repository as ZIP file

### Setup
For windows and mac, you can [download node](https://nodejs.org/en/) and install.

### Package Installation
#### Make sure you have [TypeScript](https://github.com/microsoft/TypeScript) and [Playwright](https://playwright.dev/docs/intro) installed in your device
Before start development and running the test you need to install packages that needed for this simple project. To install them, you need to do these step:

- Go to your project repo directory in your local machine.
- Open your terminal or Git Bash (if you have this)
- Type `npm install` in your terminal and press ENTER on your keyboard to install all dependecies
- Wait, and done

## Test Structure
- Use Gherkin syntax: a set of special [keywords](https://cucumber.io/docs/gherkin/reference/#keywords) to give structure and meaning to executable specifications.
  Each keyword is translated to many spoken languages; in this reference, Gherkin use English.
  Either spaces or tabs may be used for indentation. The recommended indentation level is two spaces. Here is an example:
  
  ```
  Feature: User Authentication tests

  Background:
    Given user navigates to the login page

  @login @login-success
  Scenario: Login should be success
    When user enter the username as "haristest"
    And user enter the password as "Password-123"
    When user click on the login button
    Then login should be success
  ```

- Use Page Object Model (POM): Page objects are intended to make end-to-end tests readable and easy to maintain. Instead of ad-hoc interactions with a page, a test controls the page using an instance that represents the page user interface. This is a Design Pattern that has become popular in test automation for enhancing test maintenance and reducing code duplication.

  ```
  import { expect, Locator, Page } from "@playwright/test";
  import PlaywrightWrapper from "../helper/wrapper/playwright-wrapper";
  
  
  export default class LoginPage {
    private base: PlaywrightWrapper
    constructor(private page: Page) {
      this.base = new PlaywrightWrapper(page);
    }
  
    private Elements = {
      userInput: 'input[formcontrolname="username"]',
      passwordInput: 'input[formcontrolname="password"]',
      loginBtn: '//button/span[text()="Login"]',
      errorMessage: '//mat-error[@aria-atomic="true"]'
    }
  
    async navigateToLoginPage(): Promise<void> {
      await this.base.goto(process.env.BASEURL + "/login");
      await expect(this.page).toHaveTitle("BookCart");
    }
    async enterUserName(user: string): Promise<void> {
      await this.page.locator(`css=${this.Elements.userInput}`).fill(user);
    }
    async enterPassword(Password: string): Promise<void> {
      await this.page.locator(`css=${this.Elements.passwordInput}`).fill(Password);
    }
  
    async clickLoginButton(): Promise<void> {
      await this.base.waitAndClick(`xpath=${this.Elements.loginBtn}`);
    }
  
    getErrorMessage(): Locator {
      return this.page.locator(`xpath=${this.Elements.errorMessage}`);
    }
  
    async loginUser(user: string, password: string): Promise<void> {
      await this.enterUserName(user);
      await this.enterPassword(password);
      await this.clickLoginButton();
    }
  
  }
  ```


- Use Step Definition is a method with an [expression](https://cucumber.io/docs/cucumber/step-definitions/#expressions) that links it to one or more Gherkin steps. 
  When Cucumber executes a Gherkin step in a scenario, it will look for a matching step definition to execute.
  To illustrate how this works, look at the following Gherkin Scenario step definition:
  
  ```
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
  ```

## Run Test
You can run your test by simply type `npm run test` command in your terminal, then press ENTER on your keyboard. And, the Automation Testing will run.

## Run Test through Github Actions
- Go to `Actions` tab on the top of Github page
- Choose `Playwright Tests` workflow
- Click `Run workflow` dropdown on the right side of the page
- Select browser and input cucumber tags (optional)
- Click `Run workflow` button
