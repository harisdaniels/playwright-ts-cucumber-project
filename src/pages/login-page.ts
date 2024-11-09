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