import { Page, Browser, BrowserContext } from "@playwright/test";
import { After, AfterAll, Before, BeforeAll, Status } from "@cucumber/cucumber";
import { fixture } from "./page-fixture";
import { invokeBrowser } from "../helper/browsers/browser-manager";
import { getEnv } from "../helper/env/env";
import { createLogger } from "winston";
import { options } from "../helper/util/logger";
import * as fs from 'fs-extra';

let browser: Browser;
let page: Page;
let context: BrowserContext;

BeforeAll(async function() {
	getEnv();
  browser = await invokeBrowser();
});

// WITHOUT AUTH
Before(async function({ pickle }) {
	const scenarioName: string = pickle.name + pickle.id;
	if (pickle.name.includes("admin") || pickle.name.includes("staff")) {
		context = await browser.newContext({
			storageState: getStorageState(pickle.name),
			recordVideo: {
				dir: "reports/videos/"
			}
		});
	} else {
		context = await browser.newContext({
			recordVideo: {
				dir: "reports/videos/"
			}
		});
	}
	page = await context.newPage();
	fixture.page = page;
	fixture.logger = createLogger(options(scenarioName));
	console.log(`The scenario is ${JSON.stringify(pickle.name)}.`);
});

// WITH AUTH
// Before({tags: "@auth"}, async function({ pickle }) {
// 	const scenarioName: string = pickle.name + pickle.id;
// 	context = await browser.newContext({
// 		storageState: getStorageState(pickle.name),
// 		recordVideo: {
// 			dir: "reports/videos/"
// 		}
// 	});
//   page = await context.newPage();
// 	fixture.page = page;
// 	fixture.logger = createLogger(options(scenarioName));
// 	console.log(`The scenario is ${JSON.stringify(pickle.name)}.`);
// });

After(async function({pickle, result}) {
	let videoPath: string;
	let img: Buffer;
	// screenshots
	if (result?.status == Status.FAILED) {
		img = await fixture.page.screenshot({ path: `./reports/${pickle.name}.jpeg`, type: "jpeg"});
		videoPath = await fixture.page.video().path();
	}

	await fixture.page.close();
  await context.close();
	if (result?.status == Status.FAILED) {
		await this.attach(img, "image/jpeg");
		await this.attach(fs.readFileSync(videoPath), 'video/webm');
	}
});

AfterAll(async function() {
	await browser.close();
});

function getStorageState(user: string): string | { cookies: { name: string; value: string; domain: string; path: string; expires: number; httpOnly: boolean; secure: boolean; sameSite: "Strict" | "Lax" | "None"; }[]; origins: { origin: string; localStorage: { name: string; value: string; }[]; }[]; } {
	if (user.endsWith("admin"))
			return "src/helper/auth/admin.json";
	else if (user.endsWith("staff"))
			return "src/helper/auth/staff.json";
}
