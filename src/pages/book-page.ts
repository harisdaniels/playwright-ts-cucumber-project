import { expect, Locator, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/playwright-wrapper";

export default class BooksPage {

  private base: PlaywrightWrapper
  constructor(private page: Page) {
    this.base = new PlaywrightWrapper(page);
  }

  private Elements = {
    categories: "app-book-filter a",
    title: "div.card-title",
    price: "div.card-title +p",
    addToCartBtn: '//span[normalize-space(text())="Add to Cart"]',
    bookCard: "mat-card",
    snackBar: "simple-snack-bar.mat-mdc-simple-snack-bar div",
    badgeCount: "#mat-badge-content-0"
  }

  async navigateToLandingPage(): Promise<void> {
    await this.base.goto(process.env.BASEURL);
    await this.base.waitUntil("css=div.d-flex.justify-content-start");
    await expect(this.page).toHaveTitle("BookCart");
  }

  async verifyAllCategories(categories: string[]): Promise<void> {
      const bookCategories: Locator = this.page.locator(`css=${this.Elements.categories}`);
      await expect(bookCategories).toHaveText(categories);
  }

  /*
  async addBookToCart(book: string) {
      await this.header.enterBookName(book);
      await expect(this.page.locator(this.Elements.title))
          .toHaveText(book, { ignoreCase: true });
      this.page.click(this.Elements.addToCartBtn);
      const toast = this.page.locator(this.Elements.snackBar);
      await expect(toast).toBeVisible();
      await expect(toast).toHaveText("One Item added to cart");
  }
  */

  async verifySearchedBook(book: string): Promise<void> {
    await expect(this.page.locator(`css=${this.Elements.title}`))
      .toHaveText(book, { ignoreCase: true });
  }

  async addBookToCart(): Promise<void> {
    await this.page.click(`xpath=${this.Elements.addToCartBtn}`);
    const toast: Locator = this.page.locator(`css=${this.Elements.snackBar}`);
    await expect(toast).toBeVisible();
    await expect(toast).toHaveText("One Item added to cart");
  }

  async verifyBookIsUpdated(): Promise<void> {
    const badgeCount:string = await this.page.locator(`css=${this.Elements.badgeCount}`).textContent();
    expect(Number(badgeCount?.length)).toBeGreaterThan(0);
  }

}