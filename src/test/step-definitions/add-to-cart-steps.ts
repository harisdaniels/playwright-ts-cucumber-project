import { expect } from "@playwright/test";
import { When, Then, setDefaultTimeout, Given } from "@cucumber/cucumber";
import { fixture } from "../../hooks/page-fixture";
import HeaderPage from "../../pages/header-page";
import BooksPage from "../../pages/book-page";

setDefaultTimeout(60 * 1000 * 2);

let header: HeaderPage;
let book: BooksPage


Given('user navigates to the landing page', async function () {
	book = new BooksPage(fixture.page);
  await book.navigateToLandingPage();
});

When('user search for a {string}', async function (bookname) {	
	header = new HeaderPage(fixture.page);
	book = new BooksPage(fixture.page);

	await header.enterBookName(bookname);
	await book.verifySearchedBook(bookname);
});

When('user add the book to the cart', async function () {
	await book.addBookToCart();
});

Then('the cart badge should get updated', async function () {
	await book.verifyBookIsUpdated();
});