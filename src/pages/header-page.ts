import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/playwright-wrapper";


export default class HeaderPage {
  private base: PlaywrightWrapper;
  constructor(private page: Page) {
    this.base = new PlaywrightWrapper(page);
  }

  private Elements = {
    searchInput: 'input[type="search"]',
    cartBtn: "button.mat-focus-indicator.mat-icon-button",
    cartValue: "#mat-badge-content-0",
    loginLink: "//span[text()='Login']/..",
    userMenu: "//button[contains(@class,'mat-focus-indicator mat-menu-trigger')]",
    myOrder: "//button[text()='My Orders' and @role='menuitem']",
    logoutLink: "//button[text()='Logout' and @role='menuitem']",
    textNameDropdown: "(//span[@class='mdc-button__label']//span)[1]",
    nameLinkText: "(//span[@class='mdc-button__label']//span)[1]",
    searchedBook: '//mat-option[@role="option"]'
  }


  async enterBookName(bookname: string): Promise<void> {
    await this.page.locator(`css=${this.Elements.searchInput}`).pressSequentially(bookname, {delay:150});
    await this.base.waitAndClick(this.Elements.searchedBook);
  }

  async clickOnCart(): Promise<void> {
    await this.page.click(`css=${this.Elements.cartBtn}`);
  }

  async getCartValue(): Promise<string> {
    await this.page.waitForTimeout(1000);
    return await this.page.textContent(`css=${this.Elements.cartValue}`);
  }

  async clickLoginLink(): Promise<void> {
    await this.base.navigateTo(`xpath=${this.Elements.loginLink}`);
  }

  async clickOnUserMenu(): Promise<void> {
    await this.base.waitAndClick(`xpath=${this.Elements.userMenu}`);
  }

  async clickOnMyOrder(): Promise<void> {
    await this.clickOnUserMenu();
    await this.base.waitAndClick(`xpath=${this.Elements.myOrder}`);
  }

  async logoutUser(): Promise<void> {
    await this.clickOnUserMenu();
    await this.base.navigateTo(`xpath=${this.Elements.logoutLink}`);
  }

  async verifyLoginSuccess(): Promise<void> {
    await expect(this.page.locator(`xpath=${this.Elements.userMenu}`))
        .toBeVisible();
  }

  async getNameLinkText(): Promise<void> {
    await expect(this.page.locator(`xpath=${this.Elements.nameLinkText}`))
    .toHaveText(" haristest");
  }
}